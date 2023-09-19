import React, { useContext, useMemo } from 'react';
import Constants from 'expo-constants';
import { Switch } from 'react-native-gesture-handler';
import SettingsList from '../lib/react-native-settings-list';
import BasePageView from './common/base-page-view';
import { ThemeContext } from '../lib/utils';
import logout from './logout';
import TextDisplay from './common/text-display';
import { setThemeName } from '../lib/settings';

function SettingsPage() {
  const theme = useContext(ThemeContext);

  const commonItemProps = useMemo(() => {
    return {
      hasNavArrow: false,
      titleStyle: {
        color: theme.TEXT_COLOR,
        fontSize: 16,
      },
      backgroundColor: theme.CONTROL_BACKGROUND,
    };
  }, [theme]);

  return (
    <BasePageView
      style={{
        flex: 1,
      }}
    >
      <SettingsList backgroundColor={theme.CONTROL_BACKGROUND} borderColor={theme.PAGE_BACKGROUND}>
        <SettingsList.Item
          {...commonItemProps}
          title="Use dark theme"
          rightSideContent={
            <Switch
              value={theme.DARK_MODE}
              onValueChange={(value) => setThemeName(value ? 'dark' : 'light')}
              style={{
                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                marginRight: 15,
                alignSelf: 'center',
              }}
            />
          }
        />
        <SettingsList.Item
          {...commonItemProps}
          title="App version"
          rightSideContent={
            <TextDisplay
              style={{
                marginTop: 7,
                marginRight: 15,
                alignSelf: 'center',
              }}
            >
              {Constants.expoConfig.version}
            </TextDisplay>
          }
        />
        <SettingsList.Item {...commonItemProps} title="Logout" onPress={logout} />
      </SettingsList>
    </BasePageView>
  );
}

export default SettingsPage;
