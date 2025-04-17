import React, { useContext } from 'react';
import { Text } from 'react-native';
import { fontSize, ThemeContext } from '../../lib/utils';

export default function TextDisplay({ style = {}, size = 'normal', children, ...restProps }) {
  const theme = useContext(ThemeContext);

  return (
    <Text
      style={{
        fontSize: fontSize(size),
        color: theme.TEXT_COLOR,
        fontWeight: '300',
        ...style,
      }}
      {...restProps}
    >
      {children}
    </Text>
  );
}
