<template>
    <div>
        <UiButton
            v-if="isEditMode"
            @click="toggleMode"
            :theme="UiButtonTheme.PRIMARY"
            :size="SizeType.xxl"
            :class="['modules__toggle-button', { 'modules__toggle-button--edit': isEditMode }]"
        >
            {{ isEditView ? 'Режим просмотра' : 'Режим редактирования' }}
        </UiButton>
        <div
            v-if="isLoading"
            class="modules__loading"
        >
            Загрузка...
        </div>
        <div
            v-if="error"
            class="modules__error"
        >
            {{ error }}
        </div>

        <div class="modules__block">
            <div
                v-if="!isLoading && modules.length"
                class="modules__list modules__list-container"
            >
                <div
                    v-for="module in filteredModules"
                    :key="module.module_id"
                    class="modules__item"
                >
                    <div class="modules__item-head">
                        <h2 class="modules__item-title">
                            {{ module.short_name }}
                            <UiIcon
                                v-if="isEditMode"
                                :size="SizeType.l"
                                :icon="getIconForStatus(module.status)"
                                class="modules__item-icon"
                            />
                        </h2>
                        <p class="modules__item-subtitle">
                            {{ module.full_name }}
                        </p>
                    </div>
                    <p class="modules__item-description">
                        {{ module.description }}
                    </p>
                    <div
                        v-if="isEditView"
                        class="modules__actions"
                    >
                        <UiButton
                            @click="handleEditModule(module)"
                            :theme="UiButtonTheme.PRIMARY"
                            :size="SizeType.xxl"
                            class="modules__actions-button modules__actions-button_edit"
                        >
                            Редактировать
                        </UiButton>
                        <UiButton
                            @click="deleteCard(module.module_id)"
                            :theme="UiButtonTheme.WHITE"
                            :size="SizeType.xxl"
                            class="modules__actions-button modules__actions-button_delete"
                        >
                            Удалить
                        </UiButton>
                    </div>
                    <router-link
                        :to="`/disciplines/${disciplineId}/modules/${module.module_id}`"
                        class="modules__actions-link"
                    >
                        <UiButton
                            :theme="UiButtonTheme.WHITE"
                            :size="SizeType.xxl"
                            class="modules__actions-button_view"
                        >
                            <UiIcon
                                :size="SizeType.xxl"
                                icon="weui:arrow-filled"
                                class="modules__actions-button_view-icon"
                            />
                        </UiButton>
                    </router-link>
                </div>
            </div>
            <ModulesPageForm
                v-if="showAddForm || editingModule"
                @submit="handleSubmit"
                @close="resetForm"
                :module="editingModule"
                :disciplineId="disciplineId"
            />
        </div>
        <UiButton
            v-if="isEditView"
            @click="showAddForm = true"
            :theme="UiButtonTheme.PRIMARY"
            :size="SizeType.xxl"
            class="modules__add-button"
        >
            Добавить Модуль
        </UiButton>
    </div>
</template>

<script setup lang="ts">
    import {useModules} from '~/composables/useModules';
    import {
        computed,
        onMounted,
        ref,
    } from 'vue';
    import {useApp} from '~/composables/useApp';
    import type {ModuleResponse} from '~/api/modules/types';
    import ModulesPageForm from '~/pages/modulesPage/ModulesPageForm.vue';

    const {isEditMode} = useApp();

    const {
        modules, isLoading, error, fetchModulesByDiscipline, addModule, updateModule, deleteModule,
    } = useModules();

    const localEditMode = ref(false);
    const showAddForm = ref(false);
    const editingModule = ref<ModuleResponse | null>(null);
    const route = useRoute();
    const disciplineId = Number(route.params.disciplineId);

    const filteredModules = computed(() => modules.value.filter((module) => {
        if (isEditMode.value) {
            return true;
        }

        return getIconForStatus(module.status) !== 'majesticons:eye-off';
    }));

    const toggleMode = () => {
        localEditMode.value = !localEditMode.value;
    };

    const isEditView = computed(() => localEditMode.value);

    onMounted(() => {
        fetchModulesByDiscipline(disciplineId);
    });

    const resetForm = () => {
        showAddForm.value = false;
        editingModule.value = null;
    };

    const handleAddModule = async (module: ModuleResponse) => {
        module.discipline_id = disciplineId;
        await addModule(module);
        resetForm();
    };

    const handleUpdateModule = async (module: ModuleResponse) => {
        if (editingModule.value) {
            await updateModule(module);
            resetForm();
        }
    };

    const handleEditModule = (module: ModuleResponse) => {
        editingModule.value = {...module};
        showAddForm.value = true;
    };

    const handleDeleteModule = async (id: number) => {
        await deleteModule(id, disciplineId);
    };

    const handleSubmit = async (module: ModuleResponse) => {
        if (editingModule.value) {
            await handleUpdateModule(module);
        } else {
            await handleAddModule(module);
        }
        showAddForm.value = false;
    };

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

    const deleteCard = async (idDel: number) => {
        const isConfirm = await openConfirmModal({
            title: 'Подтверждение удаления',
            text: 'Вы уверены, что хотите удалить этот модуль?',
        });

        if (isConfirm) {
            handleDeleteModule(idDel);
        }
    };
</script>

<style scoped lang="scss">
@import "../disciplinesPage/styles/disciplines-page-list";
</style>
