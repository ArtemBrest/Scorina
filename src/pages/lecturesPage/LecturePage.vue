<template>
    <div class="lectures container">
        <h1 class="lectures__title">
            Менеджер лекций
        </h1>
        <LecturePageList />
    </div>
</template>

<script setup lang="ts">
    import LecturePageList from '~/pages/lecturesPage/LecturePageList.vue';
    import {useRouter} from 'vue-router';
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
