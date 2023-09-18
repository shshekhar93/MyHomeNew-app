import * as React from 'react';
// import { ToastAndroid } from 'react-native';

const navigatorRef = React.createRef(null);

function navigate(pageName, params) {
  // if (!navigatorRef.current) {
  //   ToastAndroid.show('Application not ready', ToastAndroid.SHORT);
  //   return;
  // }

  navigatorRef.current.navigate(pageName, params);
}

export { navigatorRef, navigate };
