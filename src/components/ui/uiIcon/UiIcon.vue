<template>
    <Icon
        :icon="icon"
        :class="uiIconClasses"
        class="ui-icon"
    />
</template>
<script setup lang="ts">
    import {Icon} from '@iconify/vue';

    const props = withDefaults(defineProps<{
        icon: string
        size?: string
    }>(), {
        size: 'm',
    });

    const uiIconClasses = computed(() => ({
        [`ui-icon--size-${props.size}`]: props.size,
    }));
</script>
<style scoped lang="scss">
  @import "./styles/component";
</style>
