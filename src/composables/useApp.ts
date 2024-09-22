export const useApp = createSharedComposable(() => {
    // const {getUserInfo} = useAuth();
    // const {initWebSockets} = useSocketIo();

    const init = async () => {
        // initWebSockets();
        // Получаем инфу о пользователе на любой странице
        // await getUserInfo();
    };

    return {
        init,
    };
});
