import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import { ThemeContext } from '../lib/utils';
import splashSrc from '../assets/splash.png';

export default function SplashScreen() {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.DARK_MODE ? theme.PAGE_BACKGROUND : theme.HEADER_BACKGROUND,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Image
        source={splashSrc}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
}
