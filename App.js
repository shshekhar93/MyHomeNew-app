import 'react-native-gesture-handler';

import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { Platform, StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { hasSettingsSaved, addSettingsListener, removeSettingsListener } from './lib/settings';
import ConnectServer from './components/connect-server';
import ClientCredsScanner from './components/client-creds-scanner';
import getAccessToken from './lib/oAuth';
import DeviceList from './components/devices/device-list';
import { DARK_MODE } from './styles/colors';
import { ThemeContext, getMenuFromTheme, fixMinHeightStyleOnWeb } from './lib/utils';
import { navigatorRef } from './lib/navigation';
import SettingsPage from './components/settings-page';
import AppUpdate from './components/update';
import SplashScreen from './components/splash-screen';

ExpoSplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState(DARK_MODE);
  const [hasSettings, setHasSettings] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [refreshTs, setRefreshTs] = useState(0);

  useEffect(() => {
    const onSettingsChange = () => {
      setRefreshTs(Date.now());
    };
    addSettingsListener(onSettingsChange);

    (async () => {
      const settingsSaved = await hasSettingsSaved();
      const accessToken = settingsSaved && (await getAccessToken());
      setHasSettings(settingsSaved);
      setLoggedIn(!!accessToken);
      setTheme(DARK_MODE);
      await ExpoSplashScreen.hideAsync();
    })();

    return () => removeSettingsListener(onSettingsChange);
  }, [refreshTs]);

  useEffect(() => {
    fixMinHeightStyleOnWeb();
  });

  const getMenu = useCallback(() => getMenuFromTheme(theme), [theme]);

  if (hasSettings === null) {
    if (Platform.OS === 'web') {
      return <SplashScreen />;
    }
    return null;
  }

  return (
    <ToastProvider>
      <MenuProvider>
        <NavigationContainer ref={navigatorRef}>
          <StatusBar backgroundColor={theme.HEADER_BACKGROUND} />
          <AppUpdate isUpdating={isUpdating} setUpdating={setUpdating} />
          {!isUpdating && (
            <ThemeContext.Provider value={theme}>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: theme.HEADER_BACKGROUND,
                  },
                  headerTintColor: theme.TEXT_COLOR,
                  headerRight: getMenu,
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
                    <Stack.Screen
                      name="Settings"
                      component={SettingsPage}
                      options={{
                        title: 'Settings',
                      }}
                    />
                  </>
                )}
              </Stack.Navigator>
            </ThemeContext.Provider>
          )}
        </NavigationContainer>
      </MenuProvider>
    </ToastProvider>
  );
}
