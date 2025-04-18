import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { noop } from '../../lib/utils';

export default function PopAndFadeView({ style = {}, children, onEnd = noop }) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(fadeAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(onEnd, 1000);
  }, []);
  return <Animated.View style={{ ...style, opacity: fadeAnim }}>{children}</Animated.View>;
}
