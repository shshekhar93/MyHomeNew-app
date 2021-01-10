import React, { useContext, useMemo } from 'react';
import SettingsList from 'react-native-settings-list';
import { Switch } from 'react-native-gesture-handler';
import BasePageView from './common/base-page-view';
import { ThemeContext } from '../lib/utils';
import logout from './logout';
import { DARK_MODE } from '../styles/colors';

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
      <SettingsList backgroundColor={theme.CONTROL_BACKGROUND}>
        <SettingsList.Item
          {...commonItemProps}
          title="Use dark theme"
          rightSideContent={
            <Switch
              value={theme === DARK_MODE}
              onValueChange={() => {}}
              style={{
                transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                marginRight: 15,
                alignSelf: 'center',
              }}
            />
          }
        />
        <SettingsList.Item {...commonItemProps} title="Logout" onPress={logout} />
      </SettingsList>
    </BasePageView>
  );
}

export default SettingsPage;
