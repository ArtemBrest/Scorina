<template>
    <div class="layout-default">
        <Header class="layout-default__header" />
        <router-view />
    </div>
</template>

<script setup lang="ts">
    import Header from '~/components/header/Header.vue';
</script>
<style scoped lang="scss">
  @import "./styles/layout-default";
</style>
