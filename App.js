import 'react-native-gesture-handler';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { Platform, StatusBar } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { hasSettingsSaved, addSettingsListener, getThemeName, THEME_KEY } from './lib/settings';
import ConnectServer from './components/connect-server';
import ClientCredsScanner from './components/client-creds-scanner';
import getAccessToken from './lib/oAuth';
import DeviceList from './components/devices/device-list';
import { createTheme } from './styles/colors';
import { ThemeContext, getMenuFromTheme, additionalWebStyles } from './lib/utils';
import { navigatorRef } from './lib/navigation';
import SettingsPage from './components/settings-page';
import AppUpdate from './components/update';
import SplashScreen from './components/splash-screen';

ExpoSplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [themeName, setThemeName] = useState('dark');
  const [hasSettings, setHasSettings] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [refreshTs, setRefreshTs] = useState(0);

  const theme = useMemo(() => createTheme(themeName), [themeName]);

  const navigationTheme = useMemo(
    () => ({
      dark: theme.DARK_MODE,
      colors: {
        ...DefaultTheme.colors,
        primary: theme.TEXT_COLOR,
        background: theme.PAGE_BACKGROUND,
        card: theme.CONTROL_BACKGROUND,
        text: theme.TEXT_COLOR,
        border: theme.CONTROL_BORDER,
        notification: theme.SUCCESS_COLOR,
      },
    }),
    [theme]
  );

  useEffect(() => {
    const onSettingsChange = (key, value) => {
      if (key === THEME_KEY) {
        setThemeName(value);
      }

      setRefreshTs(Date.now());
    };
    const listener = addSettingsListener(onSettingsChange);

    (async () => {
      const settingsSaved = await hasSettingsSaved();
      const accessToken = settingsSaved && (await getAccessToken());
      setHasSettings(settingsSaved);
      setLoggedIn(!!accessToken);
      const savedTheme = await getThemeName();
      if (savedTheme) {
        setThemeName(savedTheme);
      }
      await ExpoSplashScreen.hideAsync();
    })();

    return () => listener.remove();
  }, [refreshTs]);

  useEffect(() => {
    additionalWebStyles(theme);
  }, []);

  const getMenu = useCallback(() => getMenuFromTheme(theme), [theme]);

  if (hasSettings === null) {
    if (Platform.OS === 'web') {
      return (
        <ThemeContext.Provider value={theme}>
          <SplashScreen />
        </ThemeContext.Provider>
      );
    }
    return null;
  }
  const showLogin = !hasSettings || !isLoggedIn;

  return (
    <ToastProvider>
      <MenuProvider>
        <NavigationContainer ref={navigatorRef} theme={navigationTheme}>
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
                  headerTintColor: theme.HEADER_TEXT,
                  headerRight: showLogin ? null : getMenu,
                }}
              >
                {
                  /* Login screens */
                  showLogin ? (
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
                  ) : (
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
                  )
                }
              </Stack.Navigator>
            </ThemeContext.Provider>
          )}
        </NavigationContainer>
      </MenuProvider>
    </ToastProvider>
  );
}
