<template>
    <form @submit.prevent="onSubmit">
        <label>
            Full Name:
            <input
                v-model="localForm.full_name"
                required
            >
        </label>
        <label>
            Short Name:
            <input
                v-model="localForm.short_name"
                required
            >
        </label>
        <label>
            Description:
            <textarea
                v-model="localForm.description"
                required
            ></textarea>
        </label>
        <label>
            Status:
            <select v-model="localForm.status">
                <option :value="statusType.HIDDEN">Hidden</option>
                <option :value="statusType.PUBLISHED">Published</option>
            </select>
        </label>
        <button type="submit">
            Submit
        </button>
        <button
            @click="onClose"
            type="button"
        >
            Cancel
        </button>
    </form>
</template>

<script setup lang="ts">
    import type {DisciplineResponse} from '~/api/disciplines/types';
    import {StatusType} from '~/api/types';

    const emit = defineEmits(['submit', 'close']);
    const props = defineProps<{
        discipline: DisciplineResponse | null // Пропс для передачи дисциплины при редактировании
    }>();
    const statusType = StatusType;

    const localForm = ref<DisciplineResponse>({
        discipline_id: 0,
        full_name: '',
        short_name: '',
        description: '',
        status: statusType.PUBLISHED,
    });

    // Если передана дисциплина для редактирования, копируем ее данные в форму
    watch(
        () => props.discipline,
        (newDiscipline) => {
            if (newDiscipline) {
                localForm.value = {...newDiscipline};
            }
        },
        {immediate: true},
    );

    const onSubmit = () => {
        emit('submit', localForm.value);
    };

    const onClose = () => {
        emit('close');
    };
</script>
