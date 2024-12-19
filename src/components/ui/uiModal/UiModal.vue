<template>
    <VueFinalModal
        :zIndexFn="zIndexFn"
        contentTransition="vfm-fade"
        overlayTransition="vfm-fade"
        :style="uiModalStyles"
        class="ui-modal"
    >
        <div
            :class="uiModalContainerClasses"
            class="ui-modal__container"
        >
            <div class="ui-modal__header">
                <span
                    v-if="$slots.title"
                    class="ui-modal__title"
                >
                    <slot name="title"></slot>
                </span>
                <UiButton
                    @click="emit('close')"
                    :size="SizeType.xs"
                    narrow
                    class="ui-modal__close"
                >
                    <template #icon>
                        <UiIcon
                            icon="fa:close"
                            :size="SizeType.s"
                        />
                    </template>
                </UiButton>
            </div>
            <div class="ui-modal__content">
                <slot>
                    <p class="ui-modal__text">
                        <slot name="text"></slot>
                    </p>
                </slot>
            </div>
            <div
                v-if="$slots.controls"
                class="ui-modal__controls"
            >
                <slot
                    :close="() => emit('close')"
                    :confirm="(payload: any) => emit('confirm', payload)"
                    :cancel="() => emit('cancel')"
                    name="controls"
                ></slot>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup lang="ts">
    import type {Slot} from 'vue';
    import {VueFinalModal} from 'vue-final-modal';
    import {SizeType} from '~/components/ui/ui.constants';

    const MIN_MODAL_Z_INDEX = 100000;

    interface Emits {
        (e: 'close'): void
        (e: 'confirm', payload?: any): void
        (e: 'cancel'): void
    }

    const emit = defineEmits<Emits>();

    const props = withDefaults(defineProps<{
        size?: SizeType
        zIndex?: number
        indentTop: number
        indentBottom: number
    }>(), {
        size: SizeType.m,
        zIndex: MIN_MODAL_Z_INDEX,
        indentTop: 0,
        indentBottom: 0,
    });

    interface Slots {
        default(props: {}): Slot
        title(props: {}): Slot
        text(props: {}): Slot
        controls(props: {
            close: () => void
            confirm: (payload?: any) => void
            cancel: () => void
        }): Slot
    }

    defineSlots<Slots>();

    const uiModalContainerClasses = computed(() => ({
        [`ui-modal__container--size-${props.size}`]: Boolean(props.size),
    }));

    const uiModalStyles = computed(() => ({
        '--ui-modal-indent-top': props.indentTop ? `${props.indentTop}px` : '',
        '--ui-modal-indent-bottom': props.indentBottom ? `${props.indentBottom}px` : '',
    }));

    const zIndexFn = ({index}: {index: number}) => (props.zIndex === MIN_MODAL_Z_INDEX ? MIN_MODAL_Z_INDEX + index : props.zIndex);
</script>

<style scoped lang="scss">
  @import "./styles/component";
</style>
