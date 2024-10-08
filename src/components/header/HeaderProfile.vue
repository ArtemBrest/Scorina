<template>
    <div class="header-profile">
        <UiDropdown
            v-if="isSignIn"
            v-model="isOpen"
            placement="bottom-end"
            :isTeleport="false"
            :arrow="false"
            :contentClass="`ui-dropdown__content--menu`"
        >
            <template #trigger>
                <button
                    type="button"
                    :class="HeaderProfilePictureClasses"
                >
                    <span class="header-profile-picture__avatar">
                        <UiIcon
                            v-if="true"
                            icon="fa:user"
                            :size="SizeType.l"
                            class="header-profile-picture__icon"
                        />
                        <img
                            v-else
                            src=""
                            alt="avatar"
                            class="header-profile-picture__img"
                        >
                    </span>
                    <span class="header-profile-picture__name">
                        {{ authStorage.user?.displayedName }}
                    </span>
                    <UiIcon
                        :size="SizeType.s"
                        icon="fa:chevron-down"
                        class="header-profile__icon"
                    />
                </button>
            </template>

            <template #content="{close}">
                <UiList>
                    <UiListItem
                        tag="a"
                        :to="'/'"
                        class="header-profile-item"
                    >
                        <UiIcon
                            icon="fa:user"
                            :size="SizeType.l"
                            class="header-profile-item__icon"
                        />
                        <span class="header-profile-item__label">
                            Профиль
                        </span>
                    </UiListItem>
                    <UiListItem class="header-profile-item">
                        <UiIcon
                            icon="fa:bell"
                            :size="SizeType.l"
                            class="header-profile-item__icon"
                        />
                        <span class="header-profile-item__label">
                            Уведомления
                        </span>
                    </UiListItem>
                    <UiListItem class="header-profile-item">
                        <UiIcon
                            icon="ic:round-dashboard"
                            :size="SizeType.l"
                            class="header-profile-item__icon"
                        />
                        <span class="header-profile-item__label">
                            Дашборды
                        </span>
                    </UiListItem>
                    <UiListItem
                        @click="onLogout(close)"
                        separator
                        class="header-profile-item"
                    >
                        <UiIcon
                            icon="fa-solid:sign-out-alt"
                            :size="SizeType.l"
                            class="header-profile-item__icon"
                        />
                        <span class="header-profile-item__label">
                            Выйти
                        </span>
                    </UiListItem>
                </UiList>
            </template>
        </UiDropdown>
        <UiButton
            v-else
            @click="login"
            :theme="UiButtonTheme.WHITE"
            class="header-profile__login"
        >
            <template #icon>
                <UiIcon
                    icon="fa-solid:sign-in-alt"
                    :size="SizeType.l"
                />
            </template>
            Логин
        </UiButton>
    </div>
</template>

<script setup lang="ts">
    const {authStorage, logout, login} = useAuth();

    const isOpen = ref(false);

    const isSignIn = computed(() => unref(authStorage).isSignIn);

    const HeaderProfilePictureClasses = computed(() => ({
        'header-profile-picture': true,
        'header-profile-picture--is-opened': unref(isOpen),
    }));

    const onLogout = async (close: () => void) => {
        const isConfirm = await openConfirmModal({
            title: 'Выход',
            text: 'Вы уверены, что хотите выйти?',
        });

        if (isConfirm) {
            logout();
            await login();
        }

        close();
    };
</script>

<style scoped lang="scss">
  @import "./styles/HeaderProfile/header-profile";
</style>
