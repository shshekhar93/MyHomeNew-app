import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated, ViewPropTypes } from 'react-native';
import { noop } from '../../lib/utils';

export default function PopAndFadeView({ style, children, onEnd }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
      }),
      Animated.delay(200),
      Animated.timing(fadeAnim, {
        toValue: 0,
      }),
    ]).start();
    setTimeout(onEnd, 1000);
  }, []);
  return <Animated.View style={{ ...(style || {}), opacity: fadeAnim }}>{children}</Animated.View>;
}

PopAndFadeView.defaultProps = {
  style: {},
  onEnd: noop,
};

PopAndFadeView.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
  onEnd: PropTypes.func,
};
