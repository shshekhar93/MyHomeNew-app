import { useMemo } from 'react';
import { useToast } from 'react-native-toast-notifications';

const noop = () => {};
const SHORT = {
  duration: 1000,
};

const LONG = {
  duration: 3000,
};

export default function useToastHelper() {
  const Toast = useToast();

  const show = useMemo(() => (Toast.show || noop).bind(Toast), [Toast]);
  return {
    show,
    SHORT,
    LONG,
  };
}
