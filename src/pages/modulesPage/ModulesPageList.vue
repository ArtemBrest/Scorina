<template>
    <div>
        <h1>Modules for Discipline: {{ disciplineId }}</h1>
        <div v-if="isLoading">
            Loading...
        </div>
        <div v-if="error">
            {{ error }}
        </div>
        <div v-if="!isLoading && modules.length">
            <div
                v-for="module in modules"
                :key="module.module_id"
            >
                <h2>{{ module.module_id }}: {{ module.full_name }} - {{ module.short_name }}</h2>
                <p>{{ module.description }}</p>
                <span>Status: {{ module.status }}</span>
                <span>Order: {{ module.order_number }}</span>
                <div v-if="isEditMode">
                    <button @click="handleEditModule(module)">
                        Edit
                    </button>
                    <button @click="handleDeleteModule(module.module_id)">
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <button
            v-if="isEditMode"
            @click="showAddForm = true"
        >
            Add Module
        </button>
        <!-- Форма добавления модуля -->
        <ModulesPageForm
            v-if="showAddForm || editingModule"
            @submit="handleSubmit"
            @close="handleCloseForm"
            :module="editingModule"
            :disciplineId="disciplineId"
        />
    </div>
</template>

<script setup lang="ts">
    import {useModules} from '~/composables/useModules';
    import type {ModuleResponse} from '~/api/modules/types';
    import ModulesPageForm from './ModulesPageForm.vue';

    const {isEditMode} = useApp();

    const route = useRoute();
    const disciplineId = Number(route.params.disciplineId);
    const {
        modules, isLoading, error, fetchModulesByDiscipline, addModule, updateModule, deleteModule,
    } = useModules();
    const showAddForm = ref(false);
    const editingModule = ref<ModuleResponse | null>(null);

    onMounted(() => {
        fetchModulesByDiscipline(disciplineId);
    });

    const resetForm = () => {
        showAddForm.value = false;
        editingModule.value = null; // Сбрасываем состояние редактирования
    };

    const handleAddModule = async (module: ModuleResponse) => {
        module.discipline_id = disciplineId;
        await addModule(module);
        resetForm();
    };

    const handleUpdateModule = async (module: ModuleResponse) => {
        if (editingModule.value) {
            await updateModule(module); // Обновляем модуль
            resetForm();
        }
    };
    const handleEditModule = (module: ModuleResponse) => {
        editingModule.value = {...module};
        showAddForm.value = true;
    };

    const handleDeleteModule = async (moduleId: number) => {
        await deleteModule(moduleId, disciplineId); // Удаляем модуль
    };

    const handleSubmit = async (module: ModuleResponse) => {
        if (editingModule.value) {
            await handleUpdateModule(module); // Если редактируем, то обновляем
        } else {
            await handleAddModule(module); // Иначе добавляем новую дисциплину
        }
    };

    const handleCloseForm = () => {
        editingModule.value = null; // Сбрасываем выбранный модуль при закрытии формы
        showAddForm.value = false;
    };
</script>
