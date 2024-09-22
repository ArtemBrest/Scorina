import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import Notifications from '@kyvg/vue3-notification';
import {createVfm} from 'vue-final-modal';
import {routes} from '~/routes';
import tooltip from '~/plugins/v-tooltip/v-tooltip.directive';

import App from './App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .directive('tooltip', tooltip)
    .use(router)
    .use(Notifications)
    .use(createVfm())
    .mount('#app');
