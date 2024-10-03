<template>
    <div class="layout-default">
        <Header class="layout-default__header" />
        <router-view />
        <Footer class="layout-default__footer"/>
    </div>
</template>

<script setup lang="ts">
    import Header from '~/components/header/Header.vue';
    import Footer from '~/components/footer/Footer.vue';
</script>
<style scoped lang="scss">
  @import "./styles/layout-default";
</style>
