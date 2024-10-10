<template>
    <div>
        <h1>Disciplines</h1>
        <div v-if="isLoading">
            Loading...
        </div>
        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="!isLoading && disciplines.length">
            <div
                v-for="discipline in disciplines"
                :key="discipline.discipline_id"
            >
                <h2>{{ discipline.discipline_id }}: {{ discipline.full_name }} - {{ discipline.short_name }}</h2>
                <p>{{ discipline.description }}</p>
                <span>{{ discipline.status }}</span>
                <div>
                    <div v-if="isEditMode">
                        <button @click="handleEditDiscipline(discipline)">
                            Edit
                        </button>
                        <button @click="handleDeleteDiscipline(discipline.discipline_id)">
                            Delete
                        </button>
                    </div>

                    <!-- Переход на страницу модулей -->
                    <router-link :to="`/disciplines/${discipline.discipline_id}/modules`">
                        <button>
                            View Modules
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <button
            v-if="isEditMode"
            @click="showAddForm = true"
        >
            Add Discipline
        </button>

        <DisciplinesPageForm
            v-if="showAddForm || editingDiscipline"
            @submit="handleSubmit"
            @close="resetForm"
            :discipline="editingDiscipline"
        />
    </div>
</template>

<script setup lang="ts">
    import {useDisciplines} from '~/composables/useDisciplines';
    import DisciplinesPageForm from '~/pages/disciplinesPage/DisciplinesPageForm.vue';
    import type {DisciplineResponse} from '~/api/disciplines/types';

    const {isEditMode} = useApp();

    const {
        disciplines, isLoading, error, fetchDisciplines, addDiscipline, updateDiscipline, deleteDiscipline,
    } = useDisciplines();
    const showAddForm = ref(false);
    const editingDiscipline = ref<DisciplineResponse | null>(null);

    onMounted(() => {
        fetchDisciplines();
    });

    const resetForm = () => {
        showAddForm.value = false;
        editingDiscipline.value = null; // Сбрасываем состояние редактирования
    };

    const handleAddDiscipline = async (discipline: DisciplineResponse) => {
        await addDiscipline(discipline);
        resetForm();
    };

    const handleUpdateDiscipline = async (discipline: DisciplineResponse) => {
        if (editingDiscipline.value) {
            await updateDiscipline(discipline); // Обновляем дисциплину
            resetForm();
        }
    };

    const handleEditDiscipline = (discipline: DisciplineResponse) => {
        editingDiscipline.value = {...discipline}; // Копируем данные выбранной дисциплины
        showAddForm.value = true; // Показываем форму редактирования
    };

    const handleDeleteDiscipline = async (id: number) => {
        await deleteDiscipline(id);
    };

    // Единая функция для отправки формы
    const handleSubmit = async (discipline: DisciplineResponse) => {
        if (editingDiscipline.value) {
            await handleUpdateDiscipline(discipline); // Если редактируем, то обновляем
        } else {
            await handleAddDiscipline(discipline); // Иначе добавляем новую дисциплину
        }
    };
</script>
