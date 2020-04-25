import React, { useState, useEffect } from 'react';
import {Animated} from 'react-native';

export default function PopAndFadeView(props) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    console.log('started animation!');
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1
      }),
      Animated.delay(200),
      Animated.timing(fadeAnim, {
        toValue: 0
      })
    ]).start();
    setTimeout(props.onEnd, 1000);
  }, []);
  return (
    <Animated.View style={{ ...(props.style || {}), opacity: fadeAnim }}>
      {props.children}
    </Animated.View>
  );
};
