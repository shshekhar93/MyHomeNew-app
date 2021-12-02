import React, { useContext } from 'react';
import { Text } from 'react-native';
import _omit from 'lodash/omit';
import { fontSize, ThemeContext } from '../../lib/utils';

export default function TextDisplay(props) {
  const theme = useContext(ThemeContext);
  const { style, size, children } = props;
  const restProps = _omit(props, ['style', 'size', 'children']);
  return (
    <Text
      style={{
        fontSize: fontSize(size),
        marginBottom: 8,
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

TextDisplay.defaultProps = {
  style: {},
  size: 'normal',
};
