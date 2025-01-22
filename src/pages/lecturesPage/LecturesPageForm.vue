<template>
    <div
        v-if="!isSubmitting"
        @submit.prevent="onSubmit"
        class="lectures__form"
    >
        <UiInput
            v-model="form.title"
            placeholder="Заголовок"
            required
            class="lectures__form-input"
        />
        <UiTextarea
            v-model="form.content"
            placeholder="Контент"
            required
            class="lectures__form-textarea"
        />
        <label class="lectures__form-label">
            <span class="lectures__form-label-text">Статус</span>
            <div class="lectures__form-radio-group">
                <div class="lectures__form-radio">
                    <input
                        id="status-hidden"
                        v-model="form.status"
                        type="radio"
                        :value="statusType.HIDDEN"
                        class="lectures__form-radio-input"
                    >
                    <label
                        for="status-hidden"
                        class="lectures__form-radio-label"
                    >Спрятан</label>
                </div>
                <div class="lectures__form-radio">
                    <input
                        id="status-published"
                        v-model="form.status"
                        type="radio"
                        :value="statusType.PUBLISHED"
                        class="lectures__form-radio-input"
                    >
                    <label
                        for="status-published"
                        class="lectures__form-radio-label"
                    >Показан</label>
                </div>
            </div>
        </label>
        <div class="lectures__form-buttons">
            <UiButton
                @click="onSubmit"
                :theme="UiButtonTheme.PRIMARY"
                :size="SizeType.xxl"
                type="submit"
                class="lectures__form-submit"
            >
                Сохранить изменения
            </UiButton>
            <UiButton
                @click="onClose"
                :theme="UiButtonTheme.WHITE"
                :size="SizeType.xxl"
                type="button"
                class="lectures__form-cancel"
            >
                Отмена
            </UiButton>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type {Lecture} from '~/api/lectures/types';
    import {StatusType} from '~/api/types';

    const props = defineProps<{
        lecture?: Lecture | null
        moduleId: number
    }>();

    const emit = defineEmits(['submit', 'close']);
    const statusType = StatusType;
    const isSubmitting = ref(false);

    const form = ref<Lecture>({
        title: '',
        content: '',
        status: statusType.PUBLISHED,
        module_id: props.moduleId,
    });

    watch(
        () => props.lecture,
        (newLecture) => {
            if (newLecture) {
                form.value = {...newLecture};
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
