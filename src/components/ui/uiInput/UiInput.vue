<template>
    <div
        class="ui-input"
        :class="uiInputClasses"
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
        <p
            v-if="isEditMode"
            class="ui-input__text"
        >
            {{ modelValue }}
        </p>
        <UiDropdown
            v-else
            ref="dropDownInstance"
            v-model="isVisible"
            placement="top-start"
            :triggerDisabled="true"
            :distance="8"
            class="ui-input__dropdown"
        >
            <template #trigger="{ open, close }">
                <input
                    :id="id"
                    v-model="model"
                    @input="onInput(open, close)"
                    @focus="onFocus(open)"
                    @blur="onBlur(close, open)"
                    @keydown="onKeyDown"
                    :type="type"
                    class="ui-input__field"
                    :class="uiInputFieldClasses"
                    autocomplete="off"
                    :disabled="disabled"
                    :required="required"
                    :placeholder="placeholder"
                    :pattern="pattern"
                    :minlength="min"
                    :maxlength="max"
                    :step="step"
                >
                <p
                    v-if="false"
                    class="ui-input__error"
                >
                    Ошибка ввода
                </p>
            </template>
            <template #content>
                <ul class="ui-input__message ui-input-message">
                    <li
                        v-for="(item, index) in helpMessages"
                        :key="index"
                        class="ui-input-message__item"
                        :class="uiInputMessageItemClasses(item.type)"
                    >
                        <p
                            v-if="item.prefix"
                            class="ui-input-message__label"
                        >
                            {{ item.prefix }}
                        </p>
                        <p class="ui-input-message__text">
                            {{ item.msg }}
                        </p>
                    </li>
                </ul>
            </template>
        </UiDropdown>
    </div>
</template>

<script setup lang="ts">
    import {type InputMessage, InputMessageType} from '~/components/ui/uiInput/types';
    import type UiDropdown from '~/components/ui/uiDropdown/UiDropdown.vue';
    import UiBaseLabel from '~/components/ui/uiBaseLabel/UiBaseLabel.vue';

    const props = withDefaults(defineProps<{
        modelValue: string | number
        messages?: InputMessage[]
        disabled?: boolean
        required?: boolean
        placeholder?: string
        isEditMode?: boolean
        alwaysShowErrorHint?: boolean
        min?: number
        max?: number
        step?: number
        type?: string
        highlightError?: boolean
        pattern?: string
        inputLengthCounter?: string
    }>(), {
        modelValue: '',
        placeholder: '',
        messages: () => [],
        highlightError: false,
        alwaysShowErrorHint: false,
        isEditMode: false,
        min: 0,
        max: Infinity,
        step: 1,
        type: 'text',
        pattern: '',
        inputLengthCounter: '',
    });

    const id = ref<string>('ui_input_id_' + Math.random());
    const dropDownInstance = ref<InstanceType<typeof UiDropdown>>();

    const emit = defineEmits<{(e: 'update:modelValue', model: string | number): void
                              (e: 'update:messages', value: InputMessage[]): void
                              (e: 'change', model: string | number, value: InputMessage[], isRequiredField?: boolean): void
                              (e: 'blur', model: string | number, value: InputMessage[]): void
    }>();

    const hasError = computed(() => props.messages.find((m) => m.type === InputMessageType.ERROR) || props.highlightError);

    const uiInputFieldClasses = computed(() => ({
        'ui-input__field--has-errors': unref(hasError),
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

    const isVisible = ref(false);
    let cacheModel: string | number = props.modelValue;

    const uiInputClasses = computed(() => ({
        'ui-input--disabled': props.disabled,
        'ui-input--required': props.required,
        'ui-input--has-errors': unref(hasError),
    }));

    const invalidateCache = () => {
        cacheModel = unref(model);
    };

    const processingHelpMessages = async () => {
        if (String(props.modelValue).length === 0 && unref(helpMessages).length === 0) {
            dropDownInstance.value?.close();
        }

        if (unref(hasError) || unref(helpMessages)?.length > 0) {
            dropDownInstance.value?.open();
        }
    };

    watch(helpMessages, processingHelpMessages, {
        deep: true,
    });

    const uiInputMessageItemClasses = (type: InputMessageType) => ({
        'ui-input-message__item--error': type === InputMessageType.ERROR,
    });

    const onFocus = async (open: () => void) => {
        if (props.modelValue !== cacheModel) {
            emit('change', props.modelValue, unref(helpMessages));
        }

        if (unref(helpMessages)?.length > 0) {
            open();
        }
    };

    const onBlur = (close: () => void, open: () => void) => {
        emit('blur', props.modelValue, unref(helpMessages));
        invalidateCache();
        if (props.alwaysShowErrorHint && unref(hasError)) {
            open();
        } else {
            close();
        }
    };

    const onInput = (open: () => void, close: () => void) => {
        emit('change', props.modelValue, unref(helpMessages));

        if (unref(helpMessages)?.length > 0) {
            open();
        } else {
            close();
        }
    };

    const onKeyDown = (e: KeyboardEvent) => {
        // Фильтруем Control, Alt, Backspace, Delete, etc
        if (props.pattern && !e.ctrlKey && !e.altKey && e.key.length === 1) {
            const regExp = new RegExp(props.pattern);

            if (!regExp.test(e.key)) {
                e.preventDefault();
            }
        }
    };
</script>

<style scoped lang="scss">
  @import "./styles/ui-input";
</style>
