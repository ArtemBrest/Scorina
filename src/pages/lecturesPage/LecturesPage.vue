<template>
    <div class="lectures container">
        <Breadcrumbs :items="breadcrumbsItems" />
        <h1 class="lectures__title">
            Менеджер лекций
        </h1>
        <LecturePageList />
    </div>
</template>

<script setup lang="ts">
    import {useAuth} from '~/composables/useAuth';
    import LecturePageList from '~/pages/lecturesPage/LecturesPageList.vue';
    import type {Breadcrumb} from '~/components/breadcrumbs/types/Breadcrumb';

    const router = useRouter();
    const currentRoute = useRoute();
    const {authStorage} = useAuth();
    const isLoggedIn = computed(() => authStorage.value?.isSignIn === true);

    const breadcrumbsItems = computed<Breadcrumb[]>(() => [
        {
            to: '/disciplines/',
            title: 'Дисциплины',
        },
        {
            to: `/disciplines/${Number(currentRoute.params.disciplineId)}/modules/`,
            title: 'Модули',
        },
        {
            title: 'Лекции',
        },
    ]);

    onMounted(() => {
        if (!isLoggedIn.value) {
            router.push('/login');
        }
    });
</script>

<style scoped lang="scss">
@import "../disciplinesPage/styles/disciplines-page";
</style>
