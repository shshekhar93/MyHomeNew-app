import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';

export enum ScreenNames {
  Login = 'Login',
  Scanner = 'Scanner',
  Devices = 'Devices',
  Settings = 'Settings',
  StarredDevices = 'StarredDevices',
};

const navigatorRef = React.createRef<NavigationContainerRef<{[k in ScreenNames]: []}>>();

function navigate(pageName: ScreenNames) {
  if (!navigatorRef.current) {
    return;
  }

  navigatorRef.current.navigate(pageName);
}

export { navigatorRef, navigate };
