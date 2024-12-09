<template>
    <div class="auth">
        <h1 class="auth__title">
            Авторизация
        </h1>
        <form
            @submit.prevent="handleSubmit"
            class="auth__form"
        >
            <UiInput
                v-model="email"
                type="email"
                placeholder="Введите email"
                required
                :pattern="InputPattern.EMAIL"
                class="auth__input"
            >
                <template #label>
                    Логин
                </template>
            </UiInput>
            <div class="auth__password-field">
                <UiInput
                    v-model="password"
                    :type="passwordFieldType"
                    placeholder="Введите пароль"
                    required
                    :pattern="InputPattern.STRING_ARRAY"
                    class="auth__input"
                >
                    <template #label>
                        Пароль
                    </template>
                </UiInput>
                <UiButton
                    @click="togglePasswordVisibility"
                    :theme="UiButtonTheme.WHITE"
                    :size="SizeType.l"
                    narrow
                    class="auth__toggle-password-btn"
                >
                    <template #icon>
                        <UiIcon
                            :size="SizeType.xxxs"
                            :icon="iconPass"
                        />
                    </template>
                </UiButton>
            </div>
            <div class="auth__submit-container">
                <UiButton
                    :theme="UiButtonTheme.PRIMARY"
                    :size="SizeType.xl"
                    :disabled="loading"
                    class="auth__submit-btn"
                >
                    {{ loading ? 'Загрузка...' : 'Войти' }}
                </UiButton>
            </div>
            <div
                v-if="error"
                class="auth__error-message"
            >
                {{ error }}
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import {InputPattern} from '~/components/ui/uiInput/types';

    const email = ref('');
    const password = ref<string>('');
    const passwordFieldType = ref<string>('password');
    const iconPass = ref<string>('mingcute:eye-2-fill');
    const loading = ref(false);
    const error = ref('');
    const router = useRouter();
    const route = useRoute();
    const {getAuthTokens, authStorage} = useAuth();

    const togglePasswordVisibility = (e: Event) => {
        e.preventDefault();
        passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
        iconPass.value = passwordFieldType.value === 'password' ? 'mingcute:eye-2-fill' : 'majesticons:eye-off';
    };

    const handleSubmit = async () => {
        loading.value = true;
        error.value = '';

        try {
            await getAuthTokens('', email.value, password.value);
            if (authStorage.value.isSignIn) {
                window.location.href = authStorage.value.redirectUrl || '/';
            } else {
                error.value = 'Неверные учетные данные. Пожалуйста, проверьте email и пароль.';
            }
        } catch (err) {
            console.error('Ошибка авторизации:', err);
            error.value = 'Ошибка авторизации. Пожалуйста, проверьте свои учетные данные.';
        } finally {
            loading.value = false;
        }
    };

    onMounted(async () => {
        const code = route.query.code as string;

        if (code) {
            try {
                await getAuthTokens(code, email.value, password.value);
                if (authStorage.value.isSignIn) {
                    window.location.href = authStorage.value.redirectUrl || '/';
                } else {
                    error.value = 'Ошибка авторизации через код.';
                }
            } catch (err) {
                console.error('Ошибка авторизации через код:', err);
                error.value = 'Ошибка авторизации через код.';
            }
        }
    });
</script>

<style scoped lang="scss">
@import "./styles/login-page";
</style>
