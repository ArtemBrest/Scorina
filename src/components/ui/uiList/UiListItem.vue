<template>
    <li class="ui-list-item">
        <span
            v-if="props.separator"
            class="ui-list-item__separator"
        >
        </span>
        <component
            :is="tag"
            @click="emit('click')"
            :href="href"
            :type="typeAttr"
            class="ui-list-item__control"
        >
            <slot></slot>
        </component>
    </li>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        tag?: string
        separator?: boolean
        to?: string
    }>(), {
        tag: 'button',
        separator: false,
        to: '',
    });

    const emit = defineEmits<{(e: 'click'): void}>();

    const href = computed(() => (props.tag === 'a' ? props.to : null));

    const typeAttr = computed(() => (props.tag === 'button' ? 'button' : null));
</script>

<style scoped lang="scss">
  @import "./styles/uiListItem/ui-list-item";
</style>
