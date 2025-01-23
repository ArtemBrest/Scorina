<template>
    <nav class="breadcrumbs">
        <template v-for="(item, index) in items">
            <router-link
                v-if="item.to"
                :key="index + 'link'"
                :to="item.to"
                class="breadcrumbs__item"
            >
                <span
                    v-if="item.title"
                    class="breadcrumbs__label"
                >
                    {{ item.title }}
                </span>
            </router-link>
            <span
                v-else
                :key="index + 'point'"
                class="breadcrumbs__item breadcrumbs__item--current"
            >
                <span
                    v-if="item.title"
                    class="breadcrumbs__label"
                >
                    {{ item.title }}
                </span>
            </span>
        </template>
    </nav>
</template>

<script setup lang="ts">
    import type {Breadcrumb} from '~/components/breadcrumbs/types/Breadcrumb';

    withDefaults(defineProps<{items: Breadcrumb[]}>(), {
        items: () => [],
    });
</script>

<style scoped lang="scss">
  @import "./styles/breadcrumbs";
</style>
