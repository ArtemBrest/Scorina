<template>
    <Component
        :is="tag"
        :title="title"
        :class="uiButtonClasses"
        :disabled="disabled"
        class="ui-button"
    >
        <span
            v-if="$slots.icon"
            class="ui-button__icon"
        >
            <slot name="icon"></slot>
        </span>
        <span
            v-if="$slots.default"
            class="ui-button__label"
        >
            <slot></slot>
        </span>
    </Component>
</template>

<script setup lang="ts">
    import {UiButtonTheme} from '~/components/ui/uiButton/types';
    import {SizeType} from '~/components/ui/ui.constants';

    const props = withDefaults(defineProps<{
        tag?: string
        theme?: string
        size?: string
        uppercase?: boolean
        disabled?: boolean
        narrow?: boolean
        title?: string
    }>(), {
        tag: 'button',
        theme: UiButtonTheme.DEFAULT,
        size: SizeType.m,
        uppercase: false,
        disabled: false,
        narrow: false,
        title: undefined,
    });

    const uiButtonClasses = computed(() => ({
        [`ui-button--theme-${props.theme}`]: Boolean(props.theme),
        [`ui-button--size-${props.size}`]: Boolean(props.size),
        'ui-button--narrow': props.narrow,
        'ui-button--uppercase': props.uppercase,
        'ui-button--disabled': props.disabled,
    }));
</script>

<style scoped lang="scss">
  @import "./styles/component";
</style>
