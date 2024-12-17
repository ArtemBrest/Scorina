<template>
    <div class="banner">
        <div class="container">
            <div class="banner__container">
                <div class="custom-background"></div>
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
                            Белорусский Государственный Университет Информатики и Радиоэлектроники
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
                                @click="handleLogin"
                                title="Вход"
                                class="banner__buttons-button"
                                :size="SizeType.xl"
                                :disabled="loading"
                            >
                                <template #default>
                                    <span v-if="loading">Загрузка...</span>
                                    <span v-else>Вход</span>
                                </template>
                            </UiButton>
                            <UiButton
                                v-if="showRegistrationButton"
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
                <div class="banner__box">
                    <div class="banner__slider">
                        <swiper
                            ref="mySwiper"
                            :onSlideChange="onSlideChange"
                            :onSwiper="initializeSwiper"
                            :direction="'vertical'"
                            :spaceBetween="0"
                            :slidesPerView="1"
                            :loop="true"
                            :pagination="{ el: '.swiper-pagination', clickable: true, dynamicBullets: true }"
                            class="swiper-container"
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
                            <div class="swiper-pagination">
                                <div
                                    v-for="(slide, index) in slides"
                                    :key="index"
                                    @click="goToSlide(index)"
                                    class="swiper-pagination-bullet"
                                ></div>
                            </div>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="news">
        <div class="container">
            <div class="news__container">
                <div class="news__info-cards">
                    <h2 class="news__title">
                        Новости
                    </h2>
                    <div class="news__list">
                        <div
                            v-for="(news, index) in newsList"
                            :key="index"
                            class="news__item"
                        >
                            <div class="news__item-image">
                                <img
                                    :src="news.image"
                                    alt="news image"
                                    class="news__image"
                                >
                            </div>
                            <div class="news__item-content">
                                <h3 class="news__item-title">
                                    {{ news.title }}
                                </h3>
                                <p class="news__item-date">
                                    {{ news.date }}
                                </p>
                                <p class="news__item-text">
                                    {{ news.text }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="news__info-desc">
                    <div class="news__list-desc">
                        <div
                            v-for="(news, index) in newsListDesc"
                            :key="index"
                            class="news__item-desc"
                        >
                            <div class="news__item-desc-content">
                                <p class="news__item-desc-date">
                                    {{ news.date }}
                                </p>
                                <p class="news__item-desc-text">
                                    {{ news.text }}
                                </p>
                            </div>
                        </div>
                    </div>
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
        watch,
    } from 'vue';
    import {Swiper as SwiperClass} from 'swiper';
    import {Swiper, SwiperSlide} from 'swiper/vue';
    import 'swiper/css';
    import {useAuth} from '~/composables/useAuth';

    const {authStorage, login} = useAuth();
    const userName = computed(() => {
        const storage = unref(authStorage);
        const displayedName = storage?.user?.displayedName || 'Гость';
        const nameParts = displayedName.split(' ');

        return nameParts.length > 2 ? nameParts[1] : displayedName;
    });
    const isLoggedIn = computed(() => unref(authStorage)?.isSignIn === true);
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
    const bannerInfoClasses = computed(() => ({
        'banner__info--is-login': isLoggedIn.value,
        'banner__info--not-logged-in': !isLoggedIn.value,
    }));
    const mySwiper = ref<SwiperClass | null>(null);
    const initializeSwiper = (swiperInstance: SwiperClass) => {
        mySwiper.value = swiperInstance;
        if (mySwiper.value?.autoplay?.start) {
            mySwiper.value.autoplay.start();
        } else {
            setInterval(() => mySwiper.value?.slideNext(), 3000);
        }
    };
    const updatePaginationBullet = () => {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        const activeIndexValue = mySwiper.value?.realIndex ?? 0;

        bullets.forEach((bullet, index) => (index === activeIndexValue
            ? bullet.classList.add('swiper-pagination-bullet-active')
            : bullet.classList.remove('swiper-pagination-bullet-active')));
    };
    const activeIndex = ref(0);
    const onSlideChange = () => {
        activeIndex.value = mySwiper.value?.realIndex ?? 0;
        updatePaginationBullet();
    };
    const goToSlide = (index: number) => {
        mySwiper.value?.slideToLoop(index);
        updatePaginationBullet();
    };
    const newsList = ref([
        {
            title: 'Открыт новый набор',
            date: '18.03.2024 Деканат',
            text: 'Товарищи! постоянный количественный рост и сфера нашей активности в значительной степени обуславливает.',
            image: '/src/assets/img/news.png',
        },
        {
            title: 'Открыт новый набор',
            date: '18.03.2024 Деканат',
            text: 'Товарищи! постоянный количественный рост и сфера нашей активности в значительной степени обуславливает.',
            image: '/src/assets/img/news.png',
        },
        {
            title: 'Открыт новый набор',
            date: '18.03.2024 Деканат',
            text: 'Товарищи! постоянный количественный рост и сфера нашей активности в значительной степени обуславливает.',
            image: '/src/assets/img/news.png',
        },
        {
            title: 'Открыт новый набор',
            date: '18.03.2024 Деканат',
            text: 'Товарищи! постоянный количественный рост и сфера нашей активности в значительной степени обуславливает.',
            image: '/src/assets/img/news.png',
        },
        {
            title: 'Открыт новый набор',
            date: '18.03.2024 Деканат',
            text: 'Товарищи! постоянный количественный рост и сфера нашей активности в значительной степени обуславливает.',
            image: '/src/assets/img/news.png',
        },
    ]);
    const newsListDesc = ref([
        {date: '16-03-20', text: 'Повседневная практика показывает.'},
    ]);
    const showRegistrationButton = ref(false);

    // eslint-disable-next-line no-return-assign
    watch(isLoggedIn, (newVal) => (showRegistrationButton.value = !newVal));
    const loading = ref(false);
    const handleLogin = async () => {
        loading.value = true;
        try {
            await login();
        } finally {
            loading.value = false;
        }
    };
</script>

<style scoped lang="scss">
  @import "./styles/main-page";
</style>
