<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__info">
                <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="footer__block"
                >
                    <UiIcon
                        :icon="item.icon"
                        :size="SizeType.l"
                        class="footer__icon"
                    />
                    <div class="footer__content">
                        <p class="footer__title">
                            {{ item.title }}
                        </p>
                        <a
                            v-if="item.isLink"
                            :href="item.link"
                            class="footer__text footer__text--link"
                        >
                            {{ item.text }}
                        </a>
                        <p
                            v-else
                            class="footer__text"
                        >
                            {{ item.text }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="footer__social">
                <a
                    v-for="(item, index) in itemsSocial"
                    :key="index"
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="footer__social-link"
                >
                    <UiIcon
                        :icon="item.icon"
                        :size="SizeType.xxl"
                        class="footer__social-icon"
                    />
                </a>
            </div>

            <div class="footer__copyright">
                © 2020 - 2025 SCORINA
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    interface FooterItem {
        title: string
        text: string
        icon: string
        isLink: boolean
        link?: string
    }

    interface SocialLinks {
        link: string
        icon: string
    }

    const items: FooterItem[] = [
        {
            title: 'Учреждение образования',
            text: 'Белорусский Государственный Университет Информатики и Радиоэлектроники',
            icon: 'si-glyph:congratulation-hat',
            isLink: false,
        },
        {
            title: 'Адрес',
            text: '220013, Минск, улица П. Бровки, 6',
            icon: 'gridicons:location',
            isLink: false,
        },
        {
            title: 'Телефон',
            text: '+375 17 292 32 35',
            icon: 'ic:baseline-phone-enabled',
            isLink: true,
            link: 'tel:+375172923235',
        },
        {
            title: 'Факс',
            text: '+375 17 202 10 33',
            icon: 'ic:sharp-fax',
            isLink: true,
            link: 'tel:+375172021033',
        },
        {
            title: 'E-mail',
            text: 'kanc@bsuir.by',
            icon: 'ic:sharp-email',
            isLink: true,
            link: 'mailto:kanc@bsuir.by',
        },
    ];
    const itemsSocial: SocialLinks[] = [
        {
            link: 'https://github.com',
            icon: 'foundation:social-github',
        },
        {
            link: 'https://instagram.com',
            icon: 'foundation:social-instagram',
        },
        {
            link: 'https://linkedin.com',
            icon: 'foundation:social-linkedin',
        },
        {
            link: 'https://twitter.com',
            icon: 'foundation:social-twitter',
        },
    ];
</script>

<style scoped lang="scss">
@import "./styles/footer";
</style>
