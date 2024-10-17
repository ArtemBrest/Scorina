<template>
    <div
        :class="uiBaseLabelClasses"
        class="ui-base-label"
    >
        <label
            :for="String(props.inputId)"
            class="ui-base-label__text"
        >
            <slot></slot>
            <span v-if="props.required">*</span>
        </label>
        <span
            v-if="$slots.appendAfter"
            class="ui-base-label__append"
        >
            <slot name="appendAfter"></slot>
        </span>
        <span
            v-if="inputLengthCounter"
            class="ui-base-label__counter"
        >
            {{ inputLengthCounter }}
        </span>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        inputId?: string | number | undefined
        required?: boolean
        disabled?: boolean
        inputLengthCounter?: string
    }>(), {
        inputId: '',
        required: false,
        disabled: false,
        inputLengthCounter: '',
    });

    const uiBaseLabelClasses = computed(() => ({
        'ui-base-label--disabled': props.disabled,
    }));
</script>

<style scoped lang="scss">
    @import "./styles/ui-base-label";
</style>
