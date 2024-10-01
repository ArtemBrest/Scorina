<template>
    <div class="header-logo">
        <router-link
            to="/"
            class="header-logo__link"
        >
            <img
                src="/src/assets/img/logo.png"
                alt="Scorina"
                class="header-logo__img"
                width="40"
                height="40"
            >
            <strong class="header-logo__bold">SCORINA</strong>
        </router-link>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  @import "./styles/headerLogo/header-logo";
</style>
