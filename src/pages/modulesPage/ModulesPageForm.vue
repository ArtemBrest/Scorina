<template>
    <div
        v-if="!isSubmitting"
        @submit.prevent="onSubmit"
        class="modules__form"
    >
        <UiInput
            v-model="form.full_name"
            placeholder="Введите полное название"
            required
            class="modules__form-input"
        >
            <template #label>
                Полное название:
            </template>
        </UiInput>
        <UiInput
            v-model="form.short_name"
            placeholder="Введите короткое название"
            required
            class="modules__form-input"
        >
            <template #label>
                Короткое название:
            </template>
        </UiInput>
        <UiTextarea
            v-model="form.description"
            required
            placeholder="Введите описание"
            class="modules__form-textarea"
        >
            <template #label>
                Описание:
            </template>
        </UiTextarea>
        <label class="modules__form-label">
            <span class="modules__form-label-text">Статус</span>
            <div class="modules__form-radio-group">
                <div class="modules__form-radio">
                    <input
                        id="status-hidden"
                        v-model="form.status"
                        type="radio"
                        :value="statusType.HIDDEN"
                        class="modules__form-radio-input"
                    >
                    <label
                        for="status-hidden"
                        class="modules__form-radio-label"
                    >Спрятан</label>
                </div>
                <div class="modules__form-radio">
                    <input
                        id="status-published"
                        v-model="form.status"
                        type="radio"
                        :value="statusType.PUBLISHED"
                        class="modules__form-radio-input"
                    >
                    <label
                        for="status-published"
                        class="modules__form-radio-label"
                    >Показан</label>
                </div>
            </div>
        </label>
        <UiInput
            v-model="form.order_number"
            placeholder="Введите номер порядка"
            type="number"
            required
            class="modules__form-input"
        >
            <template #label>
                Номер порядка:
            </template>
        </UiInput>
        <div class="modules__form-buttons">
            <UiButton
                @click="onSubmit"
                :theme="UiButtonTheme.PRIMARY"
                :size="SizeType.xxl"
                type="submit"
                class="modules__form-submit"
            >
                Сохранить изменения
            </UiButton>
            <UiButton
                @click="onClose"
                :theme="UiButtonTheme.WHITE"
                :size="SizeType.xxl"
                type="button"
                class="modules__form-cancel"
            >
                Отмена
            </UiButton>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type {ModuleResponse} from '~/api/modules/types';
    import {StatusType} from '~/api/types';

    const props = defineProps<{
        module?: ModuleResponse | null
        disciplineId: number
    }>();
    const emit = defineEmits(['submit', 'close']);
    const isSubmitting = ref(false);
    const statusType = StatusType;

    const form = ref<ModuleResponse>({
        module_id: 0,
        discipline_id: props.disciplineId,
        full_name: '',
        short_name: '',
        description: '',
        status: statusType.PUBLISHED,
        order_number: 0,
    });

    watch(
        () => props.module,
        (newModule) => {
            if (newModule) {
                form.value = {...newModule};
            }
        },
        {immediate: true},
    );

    const onSubmit = async () => {
        isSubmitting.value = true;
        try {
            await emit('submit', form.value);
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
