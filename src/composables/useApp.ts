// Создаем enum для ролей
export enum UserRole {
    STUDENT = 1,
    TEACHER = 2,
    ADMIN = 3,
}

export const useApp = createSharedComposable(() => {
    const {getUserInfo} = useAuth();

    const userRoleId = ref<UserRole | null>(null);
    // Функция для получения role_id из localStorage.auth
    const getUserRole = () => {
        const authData = localStorage.getItem('auth');

        if (authData) {
            try {
                const parsedAuthData = JSON.parse(authData);

                userRoleId.value = Number(parsedAuthData?.user?.role_id); // Преобразуем role_id в число
            } catch (error) {
                console.error('Failed to parse auth data:', error);
            }
        }
    };
    const isEditMode = computed(() => (
        userRoleId.value === UserRole.TEACHER
            || userRoleId.value === UserRole.ADMIN
    ));
    const init = async () => {
        // Получаем инфу о пользователе на любой странице и роль пользователя
        await getUserInfo();
        await getUserRole();
    };

    return {
        init,
        userRoleId,
        isEditMode,
        getUserRole,
    };
});
