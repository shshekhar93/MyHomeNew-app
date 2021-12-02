/* global document */
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOption, MenuOptions } from 'react-native-popup-menu';
import { Platform } from 'react-native';
import { DARK_MODE } from '../styles/colors';
import Styles from '../styles';
import { navigate } from './navigation';
import { BASE_SIZES } from './constants';

export const ThemeContext = React.createContext(DARK_MODE);

export function getMenuFromTheme(theme) {
  const optStyle = {
    optionText: {
      ...Styles.MenuOption,
      color: theme.TEXT_COLOR,
      marginLeft: 7,
      marginBottom: 7,
    },
  };
  return (
    <Menu>
      <MenuTrigger
        style={{
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
          width: 32,
          height: 32,
        }}
      >
        <Ionicons name="menu" size={32} color={theme.TEXT_COLOR} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: theme.COLOR3,
            borderRadius: 7,
          },
        }}
      >
        <MenuOption
          customStyles={{ optionText: { ...optStyle.optionText, marginTop: 7 } }}
          onSelect={() => navigate('Devices')}
          text="Devices"
        />
        <MenuOption
          customStyles={optStyle}
          onSelect={() => navigate('Starred devices')}
          text="Starred devices"
        />
        <MenuOption
          customStyles={{ optionText: { ...optStyle.optionText, marginBottom: 7 } }}
          onSelect={() => navigate('Settings')}
          text="Settings"
        />
      </MenuOptions>
    </Menu>
  );
}

export function fontSize(sizeEnum) {
  return BASE_SIZES[sizeEnum] || BASE_SIZES.normal;
}

export function fixMinHeightStyleOnWeb() {
  if (Platform.OS !== 'web') {
    return;
  }

  const root = document.getElementById('root');
  const aView = root.children[0];
  if (!aView) {
    return;
  }

  const className = Array.from(aView.classList).find((c) => c.startsWith('css-'));
  const style = document.createElement('style');
  style.innerHTML = `.${className} {\
min-height: auto \
}`;
  document.head.appendChild(style);
}

/*eslint-disable */
export const noop = () => {};
/* eslint-enable */
