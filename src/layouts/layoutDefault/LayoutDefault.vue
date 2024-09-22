<template>
    <div class="layout-default">
        <MainHeader class="layout-default__header" />
        <router-view />
    </div>
</template>

<script setup lang="ts">
    import MainHeader from '~/components/mainHeader/MainHeader.vue';
</script>
<style scoped lang="scss">
  @import "./styles/layout-default";
</style>
