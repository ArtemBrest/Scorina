export const useApp = createSharedComposable(() => {
    const {getUserInfo} = useAuth();

    const init = async () => {
        // Получаем инфу о пользователе на любой странице
        await getUserInfo();
    };

    return {
        init,
    };
});
