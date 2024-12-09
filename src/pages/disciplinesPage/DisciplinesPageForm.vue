<template>
    <div
        v-if="!isSubmitting"
        @submit.prevent="onSubmit"
        class="disciplines__form"
    >
        <UiInput
            v-model="localForm.full_name"
            placeholder="Введите полное название"
            required
            class="disciplines__form-input"
        >
            <template #label>
                Полное название:
            </template>
        </UiInput>
        <UiInput
            v-model="localForm.short_name"
            placeholder="Введите короткое название"
            required
            class="disciplines__form-input"
        >
            <template #label>
                Короткое название:
            </template>
        </UiInput>
        <UiTextarea
            v-model="localForm.description"
            required
            class="disciplines__form-textarea"
            placeholder="Введите описание"
        >
            <template #label>
                Описание:
            </template>
        </UiTextarea>
        <label class="disciplines__form-label">
            <span class="disciplines__form-label-text">Статус</span>
            <div class="disciplines__form-radio-group">
                <div class="disciplines__form-radio">
                    <input
                        id="status-hidden"
                        v-model="localForm.status"
                        type="radio"
                        :value="statusType.HIDDEN"
                        class="disciplines__form-radio-input"
                    >
                    <label
                        for="status-hidden"
                        class="disciplines__form-radio-label"
                    >Спрятан</label>
                </div>
                <div class="disciplines__form-radio">
                    <input
                        id="status-published"
                        v-model="localForm.status"
                        type="radio"
                        :value="statusType.PUBLISHED"
                        class="disciplines__form-radio-input"
                    >
                    <label
                        for="status-published"
                        class="disciplines__form-radio-label"
                    >Показан</label>
                </div>
            </div>
        </label>
        <div class="disciplines__form-buttons">
            <UiButton
                @click="onSubmit"
                :theme="UiButtonTheme.PRIMARY"
                :size="SizeType.xxl"
                type="submit"
                class="disciplines__form-submit"
            >
                Сохранить изменения
            </UiButton>
            <UiButton
                @click="onClose"
                :theme="UiButtonTheme.WHITE"
                :size="SizeType.xxl"
                type="button"
                class="disciplines__form-cancel"
            >
                Отмена
            </UiButton>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type {DisciplineResponse} from '~/api/disciplines/types';
    import {StatusType} from '~/api/types';

    const emit = defineEmits(['submit', 'close']);
    const props = defineProps<{
        discipline: DisciplineResponse | null
    }>();
    const statusType = StatusType;
    const isSubmitting = ref(false);

    const localForm = ref<DisciplineResponse>({
        discipline_id: 0,
        full_name: '',
        short_name: '',
        description: '',
        status: statusType.PUBLISHED,
    });

    watch(
        () => props.discipline,
        (newDiscipline) => {
            if (newDiscipline) {
                localForm.value = {...newDiscipline};
            }
        },
        {immediate: true},
    );

    const onSubmit = async () => {
        isSubmitting.value = true;

        try {
            await emit('submit', localForm.value);
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        } finally {
            isSubmitting.value = false;
            emit('close');
        }
    };

    const onClose = () => {
        emit('close');
    };
</script>

<style scoped lang="scss">
@import "../disciplinesPage/styles/disciplines-page-form";
</style>
