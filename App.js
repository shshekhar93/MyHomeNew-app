import 'react-native-gesture-handler';

import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { hasSettingsSaved } from './lib/settings';
import ConnectServer from './components/connect-server';
import ClientCredsScanner from './components/client-creds-scanner';
import getAccessToken from './lib/oAuth';
import DeviceList from './components/devices/device-list';
import { DARK_MODE } from './styles/colors';
import { StatusBar } from 'react-native';
import { ThemeContext, getMenuFromTheme } from './lib/utils';
import { MenuProvider } from 'react-native-popup-menu';

const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState(DARK_MODE);
  const [hasSettings, setHasSettings] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const settingsSaved = await hasSettingsSaved();
      const accessToken = settingsSaved && (await getAccessToken());
      setHasSettings(settingsSaved);
      setLoggedIn(!!accessToken);
      setTheme(DARK_MODE);
    })();
  }, []);

  const getMenu = useCallback(() => getMenuFromTheme(theme), []);

  if (hasSettings === null) {
    return <AppLoading />;
  }

  return (
    <MenuProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={theme.HEADER_BACKGROUND} />
        <ThemeContext.Provider value={theme}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.HEADER_BACKGROUND,
              },
              headerTintColor: theme.TEXT_COLOR,
              headerRight: getMenu
            }}
          >
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
        </ThemeContext.Provider>
      </NavigationContainer>
    </MenuProvider>
  );
}
