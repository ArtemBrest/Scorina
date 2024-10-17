<template>
    <div class="banner">
        <div class="banner__container">
            <!-- Display this if the user is logged in -->
            <div v-if="isLoggedIn">
                <div class="banner__info">
                    <h1 class="banner__title">
                        SCORINA
                    </h1>
                    <p class="banner__subtitle">
                        Система управления обучением
                    </p>
                    <div class="banner__university">
                        <img
                            src="../../assets/img/BSIUR-logo.png"
                            class="banner__logo"
                            alt="BSIUR-logo"
                        >
                        <p>Белорусский Государственный Университет Информатики и Радиоэлектроники</p>
                    </div>
                    <p class="banner__welcome">
                        С возвращением, {{ userName }}!
                    </p>
                </div>
                <UiButton
                    tag="button"
                    title="В личный кабинет"
                    theme="primary"
                    size="m"
                >
                    В личный кабинет
                </UiButton>
            </div>

            <!-- Display this if the user is NOT logged in -->
            <div v-else>
                <div class="banner__info">
                    <h1 class="banner__title">
                        SSC
                    </h1>
                    <p class="banner__subtitle">
                        Система управления обучением
                    </p>
                </div>
                <UiButton
                    tag="button"
                    title="Вход"
                    theme="primary"
                    size="m"
                >
                    Вход
                </UiButton>
                <UiButton
                    tag="button"
                    title="Регистрация"
                    theme="secondary"
                    size="m"
                >
                    Регистрация
                </UiButton>
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
                                class="banner__image"
                            >
                            <div class="banner__overlay">
                                <p>{{ slide.title }}</p>
                                <p>{{ slide.subtitle }}</p>
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
    import {useAuth} from '../../composables/useAuth';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';

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

    // Slides data
    const slides = ref([
        {
            image: '../../assets/img/slide1.png',
            title: 'Новое обновление',
            subtitle: 'Подача документов до 15 августа включительно',
        },
        {
            image: '../../assets/img/slide2.png',
            title: 'Новое обновление',
            subtitle: 'Система обучения получила важные обновления',
        },
        {
            image: '../../assets/img/slide3.png',
            title: 'Новое обновление',
            subtitle: 'Система обучения получила важные обновления',
        },
        {
            image: '../../assets/img/slide4.png',
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

</script>

<style scoped lang="scss">
@import "./styles/styles";
</style>
