<template>
    <UiModal
        :size="size"
        class="confirm-modal"
    >
        <template #title>
            <template v-if="stateDefault">
                {{ title }}
            </template>
            <span
                v-else
                class="confirm-modal__title"
            >
                {{ title }}
            </span>
        </template>
        <template #text>
            {{ text }}
        </template>
        <template #controls="{close, confirm}">
            <UiButton
                @click="confirm"
                :theme="buttonTheme"
            >
                {{ okText }}
            </UiButton>
            <UiButton
                @click="close"
                :theme="UiButtonTheme.GRAY"
            >
                {{ cancelText }}
            </UiButton>
        </template>
    </UiModal>
</template>

<script setup lang="ts">
    import {Answer, SizeType} from '~/components/ui/ui.constants';

    const props = withDefaults(defineProps<{
        stateDefault?: boolean
        size?: SizeType
        title?: string
        text?: string
        okText?: string
        cancelText?: string
    }>(), {
        stateDefault: false,
        size: SizeType.xs,
        title: 'Вы уверены?',
        text: 'Вы точно уверены, что хотите сделать это?',
        okText: Answer.YES,
        cancelText: Answer.NO,
    });

    const buttonTheme = computed(() => (props.stateDefault ? UiButtonTheme.GREEN : UiButtonTheme.RED));
</script>
<style scoped lang="scss">
  @import "./styles/confirm-modal";
</style>
