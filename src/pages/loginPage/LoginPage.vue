<template>
    <div>
        <h1>Авторизация</h1>
        <form @submit.prevent="handleSubmit">
            <UiInput
                v-model="email"
                type="email"
                placeholder="Введите email"
                required
                :pattern="InputPattern.EMAIL"
            >
                <template #label>
                    Введите email
                </template>
            </UiInput>
            <UiInput
                v-model="password"
                type="password"
                placeholder="Введите пароль"
                required
                :pattern="InputPattern.STRING_ARRAY"
            >
                <template #label>
                    Введите пароль
                </template>
            </UiInput>
            <UiButton
                :theme="UiButtonTheme.PRIMARY"
                :size="SizeType.xl"
                :disabled="loading"
            >
                {{ loading ? 'Загрузка...' : 'Войти' }}
            </UiButton>
            <div
                v-if="error"
                class="error"
            >
                {{ error }}
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import {InputPattern} from '~/components/ui/uiInput/types';

    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const error = ref('');
    const route = useRoute();
    const {getAuthTokens} = useAuth();

    const handleSubmit = async () => {
        loading.value = true;
        error.value = '';

        try {
            // Замените на ваш метод авторизации
            await getAuthTokens('', email.value, password.value);

            // Предполагается, что метод возвращает токены
            // window.location.href = authStorage.value.redirectUrl || '/';
            window.location.href = '/';
        } catch (err) {
            error.value = 'Ошибка авторизации. Пожалуйста, проверьте свои учетные данные.';
        } finally {
            loading.value = false;
        }
    };

    onMounted(async () => {
        const code = route.query.code as string;

        if (code) {
            await getAuthTokens(code, email.value, password.value);
            // window.location.href = authStorage.value.redirectUrl || '/';
            window.location.href = '/';
        }
    });
</script>
