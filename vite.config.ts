import {URL, fileURLToPath} from 'node:url';

import {promises as fs} from 'node:fs';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import {FileSystemIconLoader} from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';
import {chunkSplitPlugin} from 'vite-plugin-chunk-split';

const {VITE_FRONTEND_HOST, VITE_FRONTEND_PORT} = process.env;
export default defineConfig({
    server: {
        host: VITE_FRONTEND_HOST,
        port: Number(VITE_FRONTEND_PORT) || 4173,
    },
    plugins: [
        vue(),
        Icons({
            compiler: 'vue3',
            customCollections: {
                ca: FileSystemIconLoader('./src/assets/icons/ca'),
                custom: {
                    trash: () => fs.readFile('./src/assets/icons/ca/trash.svg', 'utf-8'),
                },
            },
            iconCustomizer(collection, icon, props) {
                const name = `${collection}:${icon}`;

                if (name === 'inline:async' || name === 'carbon:app-connectivity' || name === 'custom:car-a') {
                    props.width = '3em';
                    props.height = '3em';
                    props.color = 'skyblue';
                }
            },
        }),
        Components({
            resolvers: [
                IconsResolver({
                    prefix: 'icon',
                    customCollections: ['ca', 'custom'],
                }),
            ],
            dts: './auto-generated-imports/components.d.ts',
        }),
        AutoImport({
            include: [
                /\.[tj]sx?$/,
                /\.vue$/, /\.vue\?vue/,
                /\.md$/,
            ],
            imports: [
                'vue',
                'vue-router',
                '@vueuse/core',
            ],
            defaultExportByFilename: false,
            dirs: [
                './src/composables/**',
                './src/components/**',
                './src/utils/**',
            ],

            dts: './auto-generated-imports/auto-imports.d.ts',

            vueTemplate: true,

            injectAtEnd: true,

            eslintrc: {
                enabled: true,
                filepath: './auto-generated-imports/.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),
        chunkSplitPlugin({
            customSplitting: {},
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "~/assets/styles/common.scss";',
            },
        },
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./src', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
