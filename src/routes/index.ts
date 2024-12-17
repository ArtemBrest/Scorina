/**
 *  [ВАЖНО]
 *  1. Для лейаутов обязательно используйте defineAsyncComponent() для корректного
 *     динамического импорта и попадания лейаута в отдельный чанк при билде
 *  2. Для страниц используйте обычный динамический import() - vue-router с ним хорошо
 *     дружит и поддерживается лучше, чем defineAsyncComponent(), который, к тому же,
 *     вызывает warning в консоли.
 * */
import {Layouts} from '~/layouts';
import type {RouteRecordRaw} from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        meta: {
            layout: Layouts.DEFAULT,
            title: '',
        },
        component: () => import('~/pages/mainPage/MainPage.vue'),
    },
    {
        path: '/login',
        meta: {
            layout: Layouts.DEFAULT,
            title: 'Авторизация',
        },
        component: () => import('~/pages/loginPage/LoginPage.vue'),
    },
    {
        path: '/register',
        meta: {
            layout: Layouts.DEFAULT,
            title: 'Регистрация',
        },
        component: () => import('~/pages/registerPage/RegisterPage.vue'),
    },
    {
        path: '/disciplines',
        meta: {
            layout: Layouts.DEFAULT,
            title: 'Дисциплины',
        },
        component: () => import('~/pages/disciplinesPage/DisciplinesPage.vue'),
    },
    {
        path: '/disciplines/:disciplineId/modules',
        meta: {
            layout: Layouts.DEFAULT,
            title: 'Модули',
        },
        component: () => import('~/pages/modulesPage/ModulesPage.vue'),
    },
    {
        path: '/disciplines/:disciplineId/modules/:moduleId',
        meta: {
            layout: Layouts.DEFAULT,
            title: 'Модуль',
        },
        component: () => import('~/pages/lecturesPage/LecturesPage.vue'),
    },
    {
        path: '/disciplines/:disciplineId/modules/:moduleId/lectures/:lectureId',
        meta: {
            layout: Layouts.DEFAULT,
            title: 'Лекция',
        },
        component: () => import('~/pages/lecturesPage/LecturePage.vue'),
    },
    /* {
         path: '/disciplines/:disciplineId/modules/:moduleId/tests/:testId',
         meta: {
             layout: Layouts.DEFAULT,
             title: 'Тест',
         },
         component: () => import('~/pages/disciplinesPage/DisciplinesPageList.vue'),
     }, */
    // Это правило для 404 страницы, пусть оно всегда в конце списка будет, пожалуйста
    {
        path: '/:pathMatch(.*)',
        name: 'not-found',
        meta: {
            layout: Layouts.DEFAULT,
            title: 'Страница не найдена',
        },
        component: () => import('~/pages/notFoundPage/NotFoundPage.vue'),
    },
];
