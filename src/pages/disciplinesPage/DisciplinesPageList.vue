<template>
    <div>
        <UiButton
            v-if="isEditMode"
            @click="toggleMode"
            :theme="UiButtonTheme.PRIMARY"
            :size="SizeType.xxl"
            :class="['disciplines__toggle-button', { 'disciplines__toggle-button--edit': isEditMode }]"
        >
            {{ isEditView ? 'Режим просмотра' : 'Режим редактирования' }}
        </UiButton>
        <div
            v-if="isLoading"
            class="disciplines__loading"
        >
            Загрузка...
        </div>
        <div
            v-if="error"
            class="disciplines__error"
        >
            {{ error }}
        </div>

        <div class="disciplines__block">
            <div
                v-if="!isLoading && disciplines.length"
                class="disciplines__list disciplines__list-container"
            >
                <div
                    v-for="discipline in filteredDisciplines"
                    :key="discipline.discipline_id"
                    class="disciplines__item"
                >
                    <div class="disciplines__item-head">
                        <h2 class="disciplines__item-title">
                            {{ discipline.short_name }}
                            <UiIcon
                                v-if="isEditMode"
                                :size="SizeType.l"
                                :icon="getIconForStatus(discipline.status)"
                                class="disciplines__item-icon"
                            />
                        </h2>
                        <p class="disciplines__item-subtitle">
                            {{ discipline.full_name }}
                        </p>
                    </div>
                    <p class="disciplines__item-description">
                        {{ discipline.description }}
                    </p>

                    <!-- Action Buttons (Edit, Delete) -->
                    <div
                        v-if="isEditView"
                        class="disciplines__actions"
                    >
                        <UiButton
                            @click="handleEditDiscipline(discipline)"
                            :theme="UiButtonTheme.PRIMARY"
                            :size="SizeType.xxl"
                            class="disciplines__actions-button disciplines__actions-button_edit"
                        >
                            Редактировать
                        </UiButton>
                        <UiButton
                            @click="deleteCard(discipline.discipline_id)"
                            :theme="UiButtonTheme.WHITE"
                            :size="SizeType.xxl"
                            class="disciplines__actions-button disciplines__actions-button_delete"
                        >
                            Удалить
                        </UiButton>
                    </div>
                    <router-link
                        :to="`/disciplines/${discipline.discipline_id}/modules`"
                        class="disciplines__actions-link"
                    >
                        <UiButton
                            :theme="UiButtonTheme.WHITE"
                            :size="SizeType.xxl"
                            class="disciplines__actions-button_view"
                        >
                            <UiIcon
                                :size="SizeType.xxl"
                                icon="weui:arrow-filled"
                                class="disciplines__actions-button_view-icon"
                            />
                        </UiButton>
                    </router-link>
                </div>
            </div>
            <DisciplinesPageForm
                v-if="showAddForm || editingDiscipline"
                @submit="handleSubmit"
                @close="resetForm"
                :discipline="editingDiscipline"
            />
        </div>
        <UiButton
            v-if="isEditView"
            @click="showAddForm = true"
            :theme="UiButtonTheme.PRIMARY"
            :size="SizeType.xxl"
            class="disciplines__add-button"
        >
            Добавить Дисциплину
        </UiButton>
    </div>
</template>

<script setup lang="ts">
    import {useDisciplines} from '~/composables/useDisciplines';
    import {
        computed,
        onMounted,
        ref,
    } from 'vue';
    import {useApp} from '~/composables/useApp';
    import type {DisciplineResponse} from '~/api/disciplines/types';
    import DisciplinesPageForm from '~/pages/disciplinesPage/DisciplinesPageForm.vue';

    const {isEditMode} = useApp();

    const {
        disciplines, isLoading, error, fetchDisciplines, addDiscipline, updateDiscipline, deleteDiscipline,
    } = useDisciplines();

    const localEditMode = ref(false);

    const showAddForm = ref(false);
    const editingDiscipline = ref<DisciplineResponse | null>(null);

    const filteredDisciplines = computed(() => disciplines.value.filter((discipline) => {
        if (isEditMode.value) {
            return true;
        }

        return getIconForStatus(discipline.status) !== 'majesticons:eye-off';
    }));

    const toggleMode = () => {
        localEditMode.value = !localEditMode.value;
    };

    const isEditView = computed(() => localEditMode.value);

    onMounted(() => {
        fetchDisciplines();
    });

    const resetForm = () => {
        showAddForm.value = false;
        editingDiscipline.value = null;
    };

    const handleAddDiscipline = async (discipline: DisciplineResponse) => {
        await addDiscipline(discipline);
        resetForm();
    };

    const handleUpdateDiscipline = async (discipline: DisciplineResponse) => {
        if (editingDiscipline.value) {
            await updateDiscipline(discipline);
            resetForm();
        }
    };

    const handleEditDiscipline = (discipline: DisciplineResponse) => {
        editingDiscipline.value = {...discipline};
        showAddForm.value = true;
    };

    const handleDeleteDiscipline = async (id: number) => {
        await deleteDiscipline(id);
    };

    const handleSubmit = async (discipline: DisciplinesPageForm) => {
        if (editingDiscipline.value) {
            await handleUpdateDiscipline(discipline);
        } else {
            await handleAddDiscipline(discipline);
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
            text: 'Вы уверены, что хотите удалить эту дисциплину?',
        });

        if (isConfirm) {
            handleDeleteDiscipline(idDel);
        }
    };
</script>

<style scoped lang="scss">
@import "./styles/disciplines-page-list";
</style>
