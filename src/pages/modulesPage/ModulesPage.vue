<template>
    <div class="modules container">
        <Breadcrumbs :items="breadcrumbsItems" />
        <h1 class="modules__title">
            Менеджер Модулей
        </h1>
        <ModulesPageList />
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router';
    import ModulesPageList from '~/pages/modulesPage/ModulesPageList.vue';
    import {useAuth} from '~/composables/useAuth';
    import type {Breadcrumb} from '~/components/breadcrumbs/types/Breadcrumb';

    const router = useRouter();
    const {authStorage} = useAuth();

    const breadcrumbsItems = computed<Breadcrumb[]>(() => [
        {
            to: '/disciplines/',
            title: 'Дисциплины',
        },
        {
            title: 'Модули',
        },
    ]);

    const isLoggedIn = computed(() => authStorage.value?.isSignIn === true);

    onMounted(() => {
        if (!isLoggedIn.value) {
            router.push('/login');
        }
    });
</script>

<style scoped lang="scss">
  @import "../disciplinesPage/styles/disciplines-page";
</style>
