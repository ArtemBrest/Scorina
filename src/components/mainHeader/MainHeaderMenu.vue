<template>
    <ul class="main-header-menu">
        <li
            v-for="item in navLinks"
            :key="item.title"
            class="main-header-menu__item"
        >
            <component
                :is="item.to ? 'router-link' : 'span'"
                :to="item.to"
                class="main-header-menu__link"
                :class="{
                    'not-implemented': item.disabled,
                    'router-link-active': item.to && item.to !== '/' && $route.path.startsWith(item.to),
                }"
            >
                {{ item.title }}
            </component>

            <UiList
                v-if="item.submenu"
                class="main-header-menu__sub main-header-menu-sub"
            >
                <UiListItem
                    v-for="subitem in item.submenu"
                    :key="subitem.title"
                    :tag="`a`"
                    :to="subitem.to"
                    class="main-header-menu-sub__item"
                    :class="{ 'not-implemented': subitem.disabled }"
                >
                    {{ subitem.title }}
                </UiListItem>
            </UiList>
        </li>
    </ul>
</template>

<script setup lang="ts">
    const navLinks = ref([
        {
            to: '/',
            title: 'Дисциплины',
            disabled: false,
        },
        {
            title: 'Дополнительно',
            submenu: [
                {
                    to: '/',
                    title: 'Дополнительно 1',
                },
                {
                    to: '/',
                    title: 'Дополнительно 2',
                },
            ],
        },
    ]);
</script>

<style scoped lang="scss">
  @import "./styles/mainHeaderMenu/main-header-menu";
</style>
