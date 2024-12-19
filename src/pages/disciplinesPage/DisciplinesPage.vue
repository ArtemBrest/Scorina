<template>
    <div class="disciplines container">
        <h1 class="disciplines__title">
            Менеджер Дисциплин
        </h1>
        <DisciplinesPageList />
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router';
    import DisciplinesPageList from '~/pages/disciplinesPage/DisciplinesPageList.vue';
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
@import "./styles/disciplines-page";
</style>
