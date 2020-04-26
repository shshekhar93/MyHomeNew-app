import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOption, MenuOptions } from 'react-native-popup-menu';
import { DARK_MODE } from '../styles/colors';
import Styles from '../styles';

export const ThemeContext = React.createContext(DARK_MODE);

export function getMenuFromTheme(theme) {
  const optStyle= {
    optionText: {
      ...Styles.MenuOption,
      color: theme.TEXT_COLOR,
      marginLeft: 7,
      marginBottom: 7
    }
  }
  return (
    <Menu>
      <MenuTrigger style={{
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 20,
          width: 32,
          height: 32
      }}>
        <Ionicons name="md-more" size={32} color={theme.TEXT_COLOR} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: theme.COLOR3,
            borderRadius: 7
          }
        }}
      >
        <MenuOption customStyles={{ optionText: {...optStyle.optionText, marginTop: 7 } }} onSelect={() => alert('Devices')} text="Devices" />
        <MenuOption customStyles={ optStyle } onSelect={() => alert('Starred devices')} text="Starred devices" />
        <MenuOption customStyles={{ optionText: {...optStyle.optionText, marginBottom: 7 } }} onSelect={() => alert('Settings')} text="Settings" />
      </MenuOptions>
    </Menu>
  );
}
