import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { ThemeContext } from '../../lib/utils';

const DEFAULT_PADDING = 15;

export default function BasePageView({ style = {}, children, ...restProps }) {
  const theme = useContext(ThemeContext);

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: DEFAULT_PADDING,
        backgroundColor: theme.PAGE_BACKGROUND,
        minHeight: 'auto',
        ...style,
      }}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}
