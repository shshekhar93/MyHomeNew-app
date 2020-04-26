import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text, ViewPropTypes } from 'react-native';
import _omit from 'lodash/omit';
import { ThemeContext } from '../../lib/utils';

const BASE_SIZES = {
  small: 14,
  normal: 16,
  medium: 18,
  large: 22,
  larger: 24,
  huge: 26,
};

function fontSize(sizeEnum) {
  return BASE_SIZES[sizeEnum] || BASE_SIZES.normal;
}

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

TextDisplay.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
};
