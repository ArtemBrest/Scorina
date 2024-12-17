<template>
    <ul class="header-menu">
        <li
            v-for="item in navLinks"
            :key="item.title"
            class="header-menu__item"
        >
            <component
                :is="item.to ? 'router-link' : 'span'"
                v-if="item.disabled"
                :to="item.to"
                class="header-menu__link"
                :class="{
                    'not-implemented': item.disabled,
                    'router-link-active': item.to && item.to !== '/' && $route.path.startsWith(item.to),
                }"
            >
                {{ item.title }}
            </component>
        </li>
    </ul>
</template>

<script setup lang="ts">
    const navLinks = ref([
        {
            to: '/account',
            title: 'Личный кабинет',
            disabled: false,
        },
        {
            to: '/disciplines',
            title: 'Дисциплины',
            disabled: true,
        },
        {
            to: '/testing',
            title: 'Тестирование',
            disabled: false,
        },
        {
            to: '/news',
            title: 'Новости',
            disabled: false,
        },
        {
            to: '/messages',
            title: 'Сообщения',
            disabled: false,
        },
        {
            to: '/students',
            title: 'Студенты',
            disabled: false,
        },
    ]);
</script>

<style scoped lang="scss">
  @import "./styles/headerMenu/header-menu";
</style>
