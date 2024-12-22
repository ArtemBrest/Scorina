<template>
    <div>
        <UiButton
            v-if="isEditMode"
            @click="toggleMode"
            :theme="UiButtonTheme.PRIMARY"
            :size="SizeType.xxl"
            :class="['lectures__toggle-button', { 'lectures__toggle-button--edit': isEditMode }]"
        >
            {{ isEditView ? 'Режим просмотра' : 'Режим редактирования' }}
        </UiButton>
        <div
            v-if="isLoading"
            class="lectures__loading"
        >
            Загрузка...
        </div>
        <div
            v-if="error"
            class="lectures__error"
        >
            {{ error }}
        </div>
        <div class="lectures__block">
            <div
                v-if="!isLoading && lectures.length"
                class="lectures__list lectures__list-container"
            >
                <div
                    v-for="lecture in filteredLectures"
                    :key="lecture.lecture_id"
                    class="lectures__item"
                >
                    <div class="lectures__item-head">
                        <h2 class="disciplines__item-title">
                            {{ lecture.title }}
                            <UiIcon
                                v-if="isEditMode"
                                :size="SizeType.l"
                                :icon="getIconForStatus(lecture.status)"
                                class="disciplines__item-icon"
                            />
                        </h2>
                    </div>
                    <div
                        v-html="lecture.content"
                        class="disciplines__item-description">
                    </div>
                    <div
                        v-if="isEditView"
                        class="disciplines__actions"
                    >
                        <UiButton
                            @click="handleEditLecture(lecture)"
                            :theme="UiButtonTheme.PRIMARY"
                            :size="SizeType.xxl"
                            class="disciplines__actions-button disciplines__actions-button_edit"
                        >
                            Редактировать
                        </UiButton>
                        <UiButton
                            @click="deleteCard(lecture.lecture_id)"
                            :theme="UiButtonTheme.WHITE"
                            :size="SizeType.xxl"
                            class="disciplines__actions-button disciplines__actions-button_delete"
                        >
                            Удалить
                        </UiButton>
                    </div>
                </div>
            </div>
            <LecturePageForm
                v-if="showAddForm || editingLecture"
                @submit="handleSubmit"
                @close="handleCloseForm"
                :lecture="editingLecture"
                :moduleId="moduleId"
            />
        </div>
        <UiButton
            v-if="isEditView"
            @click="showAddForm = true"
            :theme="UiButtonTheme.PRIMARY"
            :size="SizeType.xxl"
            class="disciplines__add-button"
        >
            Добавить Лекцию
        </UiButton>
    </div>
</template>

<script setup lang="ts">
    import {useLectures} from '~/composables/useLectures';
    import {
        computed,
        onMounted,
        ref,
    } from 'vue';
    import type {LectureResponse} from '~/api/lectures/types';
    import LecturePageForm from '~/pages/lecturesPage/LecturePageForm.vue';

    const {isEditMode} = useApp();

    const route = useRoute();
    const moduleId = Number(route.params.moduleId);

    const {
        lectures, isLoading, error, fetchLecturesByModule, addLecture, updateLecture, deleteLecture,
    } = useLectures();
    const localEditMode = ref(false);
    const showAddForm = ref(false);
    const editingLecture = ref<LectureResponse | null>(null);

    const filteredLectures = computed(() => lectures.value.filter((lecture) => {
        if (isEditMode.value) {
            return true;
        }

        return getIconForStatus(lecture.status) !== 'majesticons:eye-off';
    }));
    const getIconForStatus = (status: string): string => {
        switch (status) {
            case 'hidden':
                return 'majesticons:eye-off';
            case 'published':
                return 'mingcute:eye-2-fill';
            default:
                return 'carbon:warning-alt';
        }
    };
    const toggleMode = () => {
        localEditMode.value = !localEditMode.value;
    };

    const isEditView = computed(() => localEditMode.value);

    onMounted(() => {
        fetchLecturesByModule(moduleId);
    });

    const resetForm = () => {
        showAddForm.value = false;
        editingLecture.value = null;
    };

    const handleAddLecture = async (lecture: LectureResponse) => {
        lecture.module_id = moduleId;
        await addLecture(lecture);
        resetForm();
    };

    const handleUpdateLecture = async (lecture: LectureResponse) => {
        if (editingLecture.value) {
            await updateLecture(lecture);
            resetForm();
        }
    };

    const handleEditLecture = (lecture: LectureResponse) => {
        editingLecture.value = {...lecture};
        showAddForm.value = true;
    };

    const handleDeleteLecture = async (lectureId: number) => {

        await deleteLecture(lectureId, moduleId);
    };

    const handleSubmit = async (lecture: LectureResponse) => {
        if (editingLecture.value) {
            await handleUpdateLecture(lecture);
        } else {
            await handleAddLecture(lecture);
        }
        showAddForm.value = false;
    };

    const handleCloseForm = () => {
        editingLecture.value = null; // Сбрасываем выбранный модуль при закрытии формы
        showAddForm.value = false;
    };
    const deleteCard = async (idDel: number) => {
        const isConfirm = await openConfirmModal({
            title: 'Подтверждение удаления',
            text: 'Вы уверены, что хотите удалить этот модуль?',
        });

        if (isConfirm) {
            handleDeleteLecture(idDel);
        }
    };
</script>

<style scoped lang="scss">
@import "../disciplinesPage/styles/disciplines-page-list";
</style>
