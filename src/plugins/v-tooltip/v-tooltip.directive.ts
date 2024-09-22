import type {Directive} from 'vue';
import {type Instance, createPopper} from '@popperjs/core/lib/popper-lite';
import flip from '@popperjs/core/lib/modifiers/flip';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import offset from '@popperjs/core/lib/modifiers/offset';
import {TooltipModifier} from '~/plugins/v-tooltip/types';
import './tooltip.scss';

let popperInstance: Instance;

const isEllipsisActive = (e: HTMLElement) => (e.offsetWidth < e.scrollWidth);

const createTooltip = (trigger: EventTarget) => {
    const tooltip = document.getElementById('tooltip');
    const content = document.getElementById('tooltip-content');
    const arrow = document.getElementById('tooltip-arrow');

    if (tooltip && content && arrow) {
        const source = trigger as HTMLElement;

        const isEllipsis = isEllipsisActive(source);

        content.textContent = source.getAttribute('data-tooltip');
        const showOnlyEllipsis = source.getAttribute('data-modifier') === TooltipModifier.ellipsis;

        if (showOnlyEllipsis && !isEllipsis) {
            return;
        }

        popperInstance = createPopper(source, tooltip, {
            placement: 'top',
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
                        offset: [0, 10],
                    },
                },
                {
                    name: 'arrow',
                    options: {
                        element: arrow,
                    },
                },
            ],
        });

        tooltip.removeAttribute('hidden');
    }
};

const destroyTooltip = () => {
    const tooltip = document.getElementById('tooltip');

    if (tooltip) {
        tooltip.setAttribute('hidden', '');
    }

    if (popperInstance) {
        popperInstance.destroy();
    }
};

const onMouseenter = (event: Event) => {
    const {target} = event;

    if (target) {
        createTooltip(target);
    }
};

const onMouseleave = (event: Event) => {
    const {target} = event;

    if (target) {
        destroyTooltip();
    }
};

const addTooltipListeners = (el: HTMLElement) => {
    el.addEventListener('mouseenter', onMouseenter);
    el.addEventListener('mouseleave', onMouseleave);
};

const removeTooltipListeners = (el: HTMLElement) => {
    el.removeEventListener('mouseenter', onMouseenter);
    el.removeEventListener('mouseleave', onMouseleave);
};

export default <Directive<HTMLElement, string>>{
    mounted(el: HTMLElement, {value, arg}) {
        if (value) {
            el.setAttribute('data-tooltip', value);
            // Example: v-tooltip:ellipsis="Tooltip text"; // arg = 'ellipsis'
            el.setAttribute('data-modifier', arg || '');
            addTooltipListeners(el);
        } else {
            el.removeAttribute('data-tooltip');
            el.removeAttribute('data-modifier');
            removeTooltipListeners(el);
        }
    },
    updated(el: HTMLElement, {value, arg}) {
        if (value) {
            el.setAttribute('data-tooltip', value);
            el.setAttribute('data-modifier', arg || '');
            addTooltipListeners(el);
        } else {
            el.removeAttribute('data-tooltip');
            el.removeAttribute('data-modifier');
            removeTooltipListeners(el);
        }
    },
    beforeUnmount(el: HTMLElement) {
        removeTooltipListeners(el);
    },
};
