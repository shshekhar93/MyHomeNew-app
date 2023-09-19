/* global document */
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOption, MenuOptions } from 'react-native-popup-menu';
import { Platform } from 'react-native';
import { createTheme } from '../styles/colors';
import { navigate } from './navigation';
import { BASE_SIZES } from './constants';

export const ThemeContext = React.createContext(createTheme('dark'));

export function getMenuFromTheme(theme) {
  const optStyle = {
    optionText: {
      fontSize: 18,
      color: theme.TEXT_COLOR,
      marginLeft: 7,
      marginBottom: 7,
    },
  };
  return (
    <Menu>
      <MenuTrigger
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
          width: 32,
          height: 32,
        }}
      >
        <Ionicons name="menu" size={32} color={theme.HEADER_TEXT} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: theme.OVERLAY_BACKGROUND,
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

const StyleElemId = 'home-applyed-custom-styles';
export function additionalWebStyles(theme) {
  if (Platform.OS !== 'web') {
    return;
  }

  if (document.getElementById(StyleElemId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = StyleElemId;
  style.innerHTML = `
    body {
      background-color: ${theme.PAGE_BACKGROUND};
    }
  `;
  document.head.appendChild(style);
}

/*eslint-disable */
export const noop = () => {};
/* eslint-enable */
