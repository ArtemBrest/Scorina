<template>
    <div>
        <h1>Регистрация</h1>
        <form @submit.prevent="register">
            <input
                v-model="email"
                type="email"
                placeholder="Введите email"
            >
            <input
                v-model="password"
                type="password"
                placeholder="Введите пароль"
            >
            <input
                v-model="name"
                type="text"
                placeholder="Введите Имя"
            >
            <input
                v-model="surname"
                type="text"
                placeholder="Введите Фамилия"
            >
            <input
                v-model="middle_name"
                type="text"
                placeholder="Введите Отчество"
            >
            <button type="submit">
                Зарегистрироваться
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    /*import {registerUser} from '~/api/auth';

    const email = ref('');
    const password = ref('');
    const name = ref('');
    const surname = ref('');
    const middle_name = ref('');

    const register = async () => {
        const response = await registerUser({
            email: email.value, password: password.value, name: name.value, surname: surname.value, middle_name: middle_name.value,
        });

        if (response?.data?.token) {
            localStorage.setItem('authToken', response.data.token);
            window.location.href = '/';
        } else {
            console.error('Ошибка регистрации:', response.error);
        }
    };*/
</script>
