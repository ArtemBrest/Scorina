<template>
    <div>
        <h1>Lecture Management</h1>
        <div class="lectures container">
            <h1 class="lectures__title">
                Менеджер лекций
            </h1>
            <LecturePageList />
        </div>
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from 'vue-router';
    import {useAuth} from '~/composables/useAuth';
    import LecturePageList from '~/pages/lecturesPage/LecturesPageList.vue';

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
