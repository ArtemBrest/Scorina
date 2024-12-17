<template>
    <form @submit.prevent="onSubmit">
        <input
            v-model="form.title"
            placeholder="Title"
            required
        >
        <textarea
            v-model="form.content"
            placeholder="Content"
            required
        ></textarea>
        <select
            v-model="form.status"
            required
        >
            <option
                v-for="status in statusOptions"
                :key="status"
                :value="status"
            >
                {{ status }}
            </option>
        </select>

        <button type="submit">
            {{ isEditMode ? 'Update' : 'Add' }} Lecture
        </button>
        <button
            @click="$emit('close')"
            type="button"
        >
            Cancel
        </button>
    </form>
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

    const isEditMode = !!props.lecture;
    const form = ref<Lecture>({
        title: '',
        content: '',
        // order_number: 1,
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

    const statusOptions = ['PUBLISHED', 'HIDDEN']; // Опции для статуса модуля

    const onSubmit = () => {
        emit('submit', form.value); // Передаем данные формы родительскому компоненту
    };

    const onClose = () => {
        emit('close');
    };
</script>
