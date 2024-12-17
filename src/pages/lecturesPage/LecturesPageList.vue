<template>
    <div>
        <h1>Lectures for Modules: {{ moduleId }}</h1>
        <div v-if="isLoading">
            Loading...
        </div>
        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="!isLoading && lectures.length">
            <div
                v-for="lecture in lectures"
                :key="lecture.lecture_id"
            >
                <h2>{{ lecture.lecture_id }}: {{ lecture.title }}</h2>
                <div>{{ lecture.content }}</div>
                <span>Status: {{ lecture.status }}</span>
                <div>
                    <div v-if="isEditMode">
                        <button @click="handleEditLecture(lecture)">
                            Edit
                        </button>
                        <button @click="handleDeleteLecture(lecture.lecture_id)">
                            Delete
                        </button>
                    </div>
                    <!-- Переход на страницу модулей -->
                    <router-link :to="`/disciplines/${disciplineId}/modules/${moduleId}/lectures/${lecture.lecture_id}`">
                        <button>
                            View Lecture
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <button
            v-if="isEditMode"
            @click="showAddForm = true"
        >
            Add Lecture
        </button>
        <LecturesPageForm
            v-if="showAddForm || editingLecture"
            @submit="handleSubmit"
            @close="handleCloseForm"
            :lecture="editingLecture"
            :moduleId="moduleId"
        />
    </div>
</template>

<script setup lang="ts">
    import {useLectures} from '~/composables/useLectures';
    import type {LectureResponse} from '~/api/lectures/types';
    import LecturesPageForm from '~/pages/lecturesPage/LecturesPageForm.vue';

    const {isEditMode} = useApp();

    const route = useRoute();
    const disciplineId = Number(route.params.disciplineId);
    const moduleId = Number(route.params.moduleId);

    const {
        lectures, isLoading, error, fetchLecturesByModule, addLecture, updateLecture, deleteLecture,
    } = useLectures();
    const showAddForm = ref(false);
    const editingLecture = ref<LectureResponse | null>(null);

    onMounted(() => {
        fetchLecturesByModule(moduleId);
    });

    const resetForm = () => {
        showAddForm.value = false;
        editingLecture.value = null; // Сбрасываем состояние редактирования
    };

    const handleAddLecture = async (lecture: LectureResponse) => {
        lecture.module_id = moduleId;
        await addLecture(lecture);
        resetForm();
    };

    const handleUpdateLecture = async (lecture: LectureResponse) => {
        if (editingLecture.value) {
            await updateLecture(lecture); // Обновляем модуль
            resetForm();
        }
    };

    const handleEditLecture = (lecture: LectureResponse) => {
        editingLecture.value = {...lecture};
        showAddForm.value = true;
    };

    const handleDeleteLecture = async (lectureId: number) => {
        await deleteLecture(lectureId, moduleId); // Удаляем модуль
    };

    const handleSubmit = async (lecture: LectureResponse) => {
        if (editingLecture.value) {
            await handleUpdateLecture(lecture); // Если редактируем, то обновляем
        } else {
            await handleAddLecture(lecture); // Иначе добавляем новую дисциплину
        }
    };

    const handleCloseForm = () => {
        editingLecture.value = null; // Сбрасываем выбранный модуль при закрытии формы
        showAddForm.value = false;
    };
</script>
