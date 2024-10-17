<template>
    <form @submit.prevent="onSubmit">
        <input
            v-model="form.full_name"
            placeholder="Full Name"
            required
        >
        <input
            v-model="form.short_name"
            placeholder="Short Name"
            required
        >
        <textarea
            v-model="form.description"
            placeholder="Description"
            required
        ></textarea>

        <!-- Поле выбора статуса -->
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

        <!-- Поле для ввода номера порядка модуля -->
        <input
            v-model="form.order_number"
            type="number"
            placeholder="Order Number"
            required
        >

        <!-- Кнопки отправки и отмены -->
        <button type="submit">
            {{ isEditMode ? 'Update' : 'Add' }} Module
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
    import type {ModuleResponse} from '~/api/modules/types';
    import {StatusType} from '~/api/types';

    const props = defineProps<{
        module?: ModuleResponse | null
        disciplineId: number
    }>();
    const emit = defineEmits(['submit', 'close']); // Определяем события submit и close

    const isEditMode = !!props.module; // Проверка, редактируем ли мы модуль
    const form = ref<ModuleResponse>({
        module_id: 0,
        discipline_id: props.disciplineId,
        full_name: '',
        short_name: '',
        description: '',
        status: StatusType.PUBLISHED,
        order_number: 0,
    });

    // Если передан модуль, то заполняем форму его данными
    watch(
        () => props.module,
        (newModule) => {
            if (newModule) {
                form.value = {...newModule};
            }
        },
        {immediate: true},
    );

    const statusOptions = ['PUBLISHED', 'HIDDEN']; // Опции для статуса модуля

    // Функция отправки формы
    const onSubmit = () => {
        emit('submit', form.value); // Передаем данные формы родительскому компоненту
    };

    const onClose = () => {
        emit('close');
    };
</script>
