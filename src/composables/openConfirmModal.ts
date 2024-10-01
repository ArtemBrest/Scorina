import type {SizeType} from '~/components/ui/ui.constants';

export interface ConfirmModalParams{
    stateDefault?: boolean
    size?: SizeType
    title?: string
    text?: string
    okText?: string
    cancelText?: string
}
export const openConfirmModal = async (params?: ConfirmModalParams): Promise<boolean> => new Promise((resolve) => {
    const {open, close} = useModal({
        component: defineAsyncComponent(() => import('~/components/modals/confirmModal/ConfirmModal.vue')),
        attrs: {
            // Pass props
            ...params,
            onClose() {
                close();
                resolve(false);
            },
            onConfirm() {
                close();
                resolve(true);
            },
        },
    });

    open();
});
