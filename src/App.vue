<template>
    <component :is="layout || 'div'">
        <router-view />
    </component>
    <!-- <UiNotifications /> -->
    <ModalsContainer />
</template>

<script setup lang="ts">
    import {ModalsContainer} from 'vue-final-modal';

    const router = useRouter();
    const layout = shallowRef();

    const DEFAULT_TITLE = 'SCORINA';

    router.afterEach((to) => {
        layout.value = to.meta.layout;
        nextTick(() => {
            const pageTitle = to.meta.title as string;

            useTitle(pageTitle || DEFAULT_TITLE);
        });
    });

    const {init} = useApp();

    onMounted(init);
</script>
<style lang="scss">
    @import "@/assets/styles/reset.scss";
    @import "@/assets/styles/app.scss";
    @import "../node_modules/vue-final-modal/dist/style.css";
    @import "../node_modules/@ckeditor/ckeditor5-theme-lark/theme/index.css";
</style>
