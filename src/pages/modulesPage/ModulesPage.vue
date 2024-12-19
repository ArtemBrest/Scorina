<template>
    <div class="modules container">
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

    const router = useRouter();
    const {authStorage} = useAuth();

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
