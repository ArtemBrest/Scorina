<template>
    <div class="banner">
        <div class="banner__container">
            <!-- Display this if the user is logged in -->
            <div
                class="banner__info"
                :class="bannerInfoClasses"
            >
                <h1 class="banner__title">
                    SCORINA
                </h1>
                <p class="banner__subtitle">
                    Система управления обучением
                </p>
                <div
                    v-if="isLoggedIn"
                    class="banner__university"
                >
                    <img
                        src="/src/assets/img/BSIUR-logo.png"
                        class="banner__university-logo"
                        alt="BSIUR-logo"
                    >
                    <p class="banner__university-text">
                        Белорусский Государственный Университет Информатики и
                        Радиоэлектроники
                    </p>
                </div>
                <p
                    v-if="isLoggedIn"
                    class="banner__welcome"
                >
                    С возвращением, {{ userName }}!
                </p>
                <div class="banner__buttons">
                    <UiButton
                        v-if="isLoggedIn"
                        title="В личный кабинет"
                        :size="SizeType.xl"
                    >
                        В личный кабинет
                    </UiButton>
                    <template v-else>
                        <UiButton
                            title="Вход"
                            class="banner__buttons-button"
                            :size="SizeType.xl"
                        >
                            Вход
                        </UiButton>
                        <UiButton
                            title="Регистрация"
                            class="banner__buttons-button"
                            :size="SizeType.xl"
                            :theme="UiButtonTheme.WHITE"
                        >
                            Регистрация
                        </UiButton>
                    </template>
                </div>
            </div>

            <!-- Banner image and overlay -->
            <div class="banner__box">
                <div class="banner__slider">
                    <swiper
                        @swiper="onSwiper"
                        @slideChange="onSlideChange"
                        :slidesPerView="1"
                        :spaceBetween="0"
                        :pagination="{ clickable: true }"
                        :loop="true"
                        :direction="'vertical'"
                        :scrollbar="{ draggable: true }"
                    >
                        <swiper-slide
                            v-for="(slide, index) in slides"
                            :key="index"
                            class="banner__slide"
                        >
                            <img
                                :src="slide.image"
                                :alt="slide.title"
                                class="banner__box-image"
                            >
                            <div class="banner__box-overlay">
                                <p class="banner__box-overlay-title">
                                    {{ slide.title }}
                                </p>
                                <p class="banner__box-overlay-subtitle">
                                    {{ slide.subtitle }}
                                </p>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        computed,
        ref,
        unref,
    } from 'vue';
    import {Swiper, SwiperSlide} from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';
    import {useAuth} from '~/composables/useAuth';
    import {UiButtonTheme} from '~/components/ui/uiButton/types';

    const {authStorage} = useAuth();

    const userName = computed(() => {
        const storage = unref(authStorage);
        const displayedName = storage?.user?.displayedName || 'Гость';
        const nameParts = displayedName.split(' ');

        return nameParts.length > 2 ? nameParts[1] : displayedName;
    });

    const isLoggedIn = computed(() => {
        const storage = unref(authStorage);

        return storage?.isSignIn === true;
    });

    const slides = ref([
        {
            image: '/src/assets/img/slide1.png',
            title: 'Новое обновление',
            subtitle: 'Подача документов до 15 августа включительно',
        },
        {
            image: '/src/assets/img/slide2.png',
            title: 'Новое обновление',
            subtitle: 'Система обучения получила важные обновления',
        },
        {
            image: '/src/assets/img/slide3.png',
            title: 'Новое обновление',
            subtitle: 'Система обучения получила важные обновления',
        },
        {
            image: '/src/assets/img/slide4.png',
            title: 'Новое обновление',
            subtitle: 'Система обучения получила важные обновления',
        },
    ]);

    const onSwiper = (swiper: any) => {
        console.log(swiper);
    };
    const onSlideChange = () => {
        console.log('slide change');
    };

    const bannerInfoClasses = computed(() => ({
        'banner__info--is-login': isLoggedIn.value,
    }));

</script>

<style scoped lang="scss">
@import "./styles/main-page";
</style>
