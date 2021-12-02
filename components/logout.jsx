import { Alert, Platform } from 'react-native';
import { setServerAddress, setClientId, setClientSecret } from '../lib/settings';

function logout() {
  const clearSettings = async () => {
    try {
      await Promise.all([setServerAddress(''), setClientId(''), setClientSecret('')]);
    } catch (e) {
      // console.error(e.stack || e);
    }
  };

  if (Platform.OS === 'web') {
    /* eslint-disable-next-line */
    const confirmed = window.confirm('Do you really want to logout?');
    if (confirmed) {
      clearSettings();
    }
  }

  Alert.alert('Logout?', 'Do you want to logout from your account on this phone?', [
    {
      text: 'Cancel',
      onPress: () => {},
      style: 'cancel',
    },
    {
      text: 'Logout',
      onPress: clearSettings,
      style: 'destructive',
    },
  ]);
}

export default logout;
