import React, { useContext } from 'react';
import { Text } from 'react-native';
import _omit from 'lodash/omit';
import { ThemeContext } from '../../lib/utils';

export default function TextDisplay(props) {
  const theme = useContext(ThemeContext);
  const {style = {}, size} = props;
  const restProps = _omit(props, ['style', 'size', 'children']);
  return (
    <Text
      style={{
        fontSize: fontSize(size),
        marginBottom: 8,
        color: theme.TEXT_COLOR,
        fontWeight: '300',
        ...style
      }}
      {...restProps}
    >{props.children}</Text>
  );
};

const BASE_SIZES = {
  small: 14,
  normal: 16,
  medium: 18,
  large: 22,
  larger: 24,
  huge: 26
};

function fontSize(sizeEnum) {
  return BASE_SIZES[sizeEnum] || BASE_SIZES.normal;
} 
