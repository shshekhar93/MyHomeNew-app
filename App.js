import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { hasSettingsSaved } from './lib/settings';
import ConnectServer from './components/connect-server';
import ClientCredsScanner from './components/client-creds-scanner';
import getAccessToken from './lib/oAuth';
import DeviceList from './components/devices/device-list';

const Stack = createStackNavigator();

export default function App() {
  const [hasSettings, setHasSettings] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const settingsSaved = await hasSettingsSaved();
      const accessToken = settingsSaved && (await getAccessToken());
      setHasSettings(settingsSaved);
      setLoggedIn(!!accessToken);
    })();
  }, []);

  if (hasSettings === null) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {
          /* Login screens */
          (hasSettings === false || isLoggedIn === false) && (
            <>
              <Stack.Screen
                name="Login"
                component={ConnectServer}
                options={{
                  title: 'Login',
                }}
              />
              <Stack.Screen
                name="Scanner"
                component={ClientCredsScanner}
                options={{
                  title: 'Scan QR',
                }}
              />
            </>
          )
        }
        {hasSettings && isLoggedIn && (
          <>
            <Stack.Screen
              name="Devices"
              component={DeviceList}
              options={{
                title: 'Devices',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
