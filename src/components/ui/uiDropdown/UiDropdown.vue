<template>
    <div class="ui-dropdown">
        <div
            ref="triggerRef"
            @click="onClickTrigger"
            @mouseenter="onMouseEnterTrigger"
            class="ui-dropdown__trigger"
        >
            <slot
                name="trigger"
                :close="hide"
                :open="show"
                :toggle="onToggle"
            >
                <slot></slot>
            </slot>
        </div>
        <Teleport
            to="#teleports"
            :disabled="!isTeleport"
        >
            <div
                v-if="$slots.content"
                ref="contentRef"
                :class="contentClass"
                :style="uiDropdownContentStyles"
                hidden
                class="ui-dropdown__content"
            >
                <div
                    v-if="arrow"
                    ref="arrowRef"
                    class="ui-dropdown__arrow"
                ></div>
                <slot
                    name="content"
                    :close="hide"
                    :open="show"
                    :toggle="onToggle"
                >
                </slot>
            </div>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
    import type {Slot} from 'vue';
    import {type Instance, createPopper} from '@popperjs/core/lib/popper-lite';
    import flip from '@popperjs/core/lib/modifiers/flip';
    import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
    import type {Placement} from '@popperjs/core/lib/enums';
    import offset from '@popperjs/core/lib/modifiers/offset';

    const triggerRef = ref();
    const contentRef = ref();
    const arrowRef = ref();
    let popperInstance: Instance;

    const props = withDefaults(defineProps<{
        /** С какой стороны открывается дропдаун * */
        placement?: Placement
        /** Открывает дропдаун при наведении * */
        hover?: boolean
        /** Пропс для ручного управления видимостью дропдауна * */
        isOpen?: boolean
        /** Перемещает контент в див #teleports * */
        isTeleport?: boolean
        /** Отступ от триггер-элемента * */
        distance?: number
        /** Смещение в сторону от триггер-элемента * */
        skidding?: number
        /** Отключает триггер-элемент для ручного управления показом дропдауна * */
        triggerDisabled?: boolean
        /** Максимальная ширина дропдауна * */
        maxWidth?: number | 'auto'
        /** CSS-класс для области контента * */
        contentClass?: string
        /** Отображение стрелки у дропдауна * */
        arrow?: boolean
    }>(), {
        placement: 'auto',
        hover: false,
        isOpen: false,
        isTeleport: true,
        distance: 4,
        skidding: 0,
        triggerDisabled: false,
        maxWidth: 'auto',
        contentClass: '',
        arrow: true,
    });

    const isOpenLocal = defineModel<boolean>('modelValue', {required: false, default: false});

    interface Slots {
        default: Slot
        trigger(props: {
            close: () => void
            open: () => void
            toggle: () => void
        }): Slot
        content(props: {
            close: () => void
            open: () => void
            toggle: () => void
        }): Slot
    }

    defineSlots<Slots>();

    const uiDropdownContentStyles = computed(() => ({
        maxWidth: props.maxWidth !== 'auto' ? `${props.maxWidth}px` : 'auto',
    }));

    // 2 стратегии: click(with outside) и hover
    const show = () => {
        isOpenLocal.value = true;
        contentRef.value?.removeAttribute('hidden');
        popperInstance?.update(); // correctly placement
    };

    const hide = () => {
        isOpenLocal.value = false;
        contentRef.value?.setAttribute('hidden', '');
        popperInstance?.update(); // correctly placement
    };

    const onMouseenter = () => {
        if (props.hover) {
            show();
        }
    };

    const onMouseleave = () => {
        if (props.hover) {
            hide();
        }
    };

    const destroy = () => {
        if (props.hover) {
            triggerRef.value?.removeEventListener('mouseenter', onMouseenter);
            triggerRef.value?.removeEventListener('mouseleave', onMouseleave);
        }

        hide();

        popperInstance?.destroy();
    };

    const create = async () => {
        popperInstance = createPopper(triggerRef.value, contentRef.value, {
            placement: props.placement,
            modifiers: [
                flip,
                preventOverflow,
                offset,
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['auto'],
                    },
                },
                {
                    name: 'offset',
                    options: {
                        offset: [props.skidding, props.distance],
                    },
                },
                {
                    name: 'arrow',
                    options: {
                        element: arrowRef.value,
                    },
                },
            ],
        });

        onClickOutside(
            contentRef.value,
            () => {
                if (unref(isOpenLocal)) {
                    hide();
                }
            },
            {ignore: [triggerRef]},
        );

        if (props.hover) {
            triggerRef.value.addEventListener('mouseenter', onMouseenter);
            triggerRef.value.addEventListener('mouseleave', onMouseleave);
        }
    };

    const onToggle = () => {
        if (props.hover) {
            return;
        }

        if (!unref(isOpenLocal)) {
            show();
        } else {
            hide();
        }
    };

    const onMouseEnterTrigger = () => {
        if (props.hover && popperInstance !== null) {
            show();
        }
    };

    const onClickTrigger = () => {
        if (props.triggerDisabled) {
            return;
        }

        onToggle();
    };

    watch(() => isOpenLocal.value, (val) => {
        if (val) {
            show();
        } else {
            hide();
        }
    });

    defineExpose({
        open: show,
        close: hide,
    });

    onMounted(create);
    onBeforeUnmount(destroy);

</script>
<style scoped lang="scss">
  @import "./styles/ui-dropdown";
</style>
