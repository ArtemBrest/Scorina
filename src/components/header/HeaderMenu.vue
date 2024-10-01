<template>
    <ul class="header-menu">
        <li
            v-for="item in navLinks"
            :key="item.title"
            class="header-menu__item"
        >
            <component
                :is="item.to ? 'router-link' : 'span'"
                :to="item.to"
                class="header-menu__link"
                :class="{
                    'not-implemented': item.disabled,
                    'router-link-active': item.to && item.to !== '/' && $route.path.startsWith(item.to),
                }"
            >
                {{ item.title }}
            </component>

            <UiList
                v-if="item.submenu"
                class="header-menu__sub header-menu-sub"
            >
                <UiListItem
                    v-for="subitem in item.submenu"
                    :key="subitem.title"
                    :tag="`a`"
                    :to="subitem.to"
                    class="header-menu-sub__item"
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
            to: '/account',
            title: 'Личный кабинет',
            disabled: true,
        },
        {
            to: '/disciplines',
            title: 'Дисциплины',
            disabled: true,
            submenu: [
                /* {
                    to: '#',
                    title: 'Дисциплина 1',
                }, */
            ],
        },
        {
            to: '/testing',
            title: 'Тестирование',
            disabled: true,
        },
        {
            to: '/news',
            title: 'Новости',
            disabled: true,
        },
        {
            to: '/messages',
            title: 'Сообщения',
            disabled: true,
        },
        {
            to: '/students',
            title: 'Студенты',
            disabled: true,
        },
    ]);
</script>

<style scoped lang="scss">
  @import "./styles/headerMenu/header-menu";
</style>
