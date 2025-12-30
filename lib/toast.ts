import { Toast as RNToast } from 'toastify-react-native';
import { ToastType } from 'toastify-react-native/utils/interfaces';

export const Toast = {
    show: (type: ToastType, text: string) => RNToast.show({
        type,
        text1: text,
        position: 'bottom',
        backgroundColor: '#424E57',
        textColor: '#ffffff',
    }),
    success: (text: string) => {
        Toast.show('success', text)
    },
    error: (text: string) => {
        Toast.show('error', text)
    }
};
