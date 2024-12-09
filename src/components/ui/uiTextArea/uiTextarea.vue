<template>
    <div
        class="ui-textarea"
        :class="uiTextareaClasses"
    >
        <UiBaseLabel
            v-if="$slots.label"
            :inputId="id"
            :required="required"
            :disabled="disabled"
            :inputLengthCounter="inputLengthCounter"
        >
            <slot name="label"></slot>
            <template #appendAfter>
                <slot name="labelAppend"></slot>
            </template>
        </UiBaseLabel>
        <textarea
            v-if="!isEditMode"
            :id="id"
            v-model="model"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            :disabled="disabled"
            :required="required"
            :placeholder="placeholder"
            :maxlength="max"
            :minlength="min"
            :rows="rows"
            :cols="cols"
            class="ui-textarea__field"
        ></textarea>
        <p
            v-if="isEditMode"
            class="ui-textarea__text"
        >
            {{ modelValue }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import {type InputMessage, InputMessageType} from '~/components/ui/uiInput/types';
    import UiBaseLabel from '~/components/ui/uiBaseLabel/UiBaseLabel.vue';

    const props = withDefaults(defineProps<{
        modelValue: string | number
        messages?: InputMessage[]
        disabled?: boolean
        required?: boolean
        placeholder?: string
        isEditMode?: boolean
        min?: number
        max?: number
        rows?: number
        cols?: number
        inputLengthCounter?: string
    }>(), {
        modelValue: '',
        placeholder: '',
        messages: () => [],
        isEditMode: false,
        min: 0,
        max: Infinity,
        rows: 4,
        cols: 50,
        inputLengthCounter: '',
    });

    const id = ref<string>('ui_textarea_id_' + Math.random());
    const emit = defineEmits<{(e: 'update:modelValue', model: string | number): void
                              (e: 'update:messages', value: InputMessage[]): void
                              (e: 'change', model: string | number, value: InputMessage[], isRequiredField?: boolean): void
                              (e: 'blur', model: string | number, value: InputMessage[]): void
    }>();

    const hasError = computed(() => props.messages.find((m) => m.type === InputMessageType.ERROR));

    const uiTextareaClasses = computed(() => ({
        'ui-textarea--disabled': props.disabled,
        'ui-textarea--required': props.required,
        'ui-textarea--has-errors': hasError.value,
    }));

    const model = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    const helpMessages = computed({
        get() {
            return props.messages;
        },
        set(value) {
            emit('update:messages', value);
        },
    });

    const onFocus = () => {
        if (props.modelValue !== model.value) {
            emit('change', props.modelValue, helpMessages.value);
        }
    };

    const onBlur = () => {
        emit('blur', props.modelValue, helpMessages.value);
    };

    const onInput = () => {
        emit('change', props.modelValue, helpMessages.value);
    };
</script>

<style scoped lang="scss">
@import "./styles/ui-textarea";
</style>
