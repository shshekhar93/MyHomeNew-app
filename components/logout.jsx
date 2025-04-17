import { Alert, Platform } from 'react-native';
import { setServerAddress, setClientId, setClientSecret } from '../lib/settings';

function logout() {
  const clearSettings = async () => {
    try {
      await Promise.all([setServerAddress(''), setClientId(''), setClientSecret('')]);
    }
    catch {
      /* Ignore the error */
    }
  };

  if (Platform.OS === 'web') {
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
