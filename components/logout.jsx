import { Alert } from 'react-native';
import { setServerAddress, setClientId, setClientSecret } from '../lib/settings';

function logout() {
  Alert.alert('Logout?', 'Do you want to logout from your account on this phone?', [
    {
      text: 'Cancel',
      onPress: () => {},
      style: 'cancel',
    },
    {
      text: 'Logout',
      onPress: async () => {
        try {
          await Promise.all([setServerAddress(''), setClientId(''), setClientSecret('')]);
        } catch (e) {
          console.error(e.stack || e);
        }
      },
      style: 'destructive',
    },
  ]);
}

export default logout;
