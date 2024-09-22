<template>
    <h1>Главная страница</h1>
</template>
<script setup lang="ts">
    const router = useRouter();

    onMounted(() => {
        router.push({path: '/'});
    });
</script>
