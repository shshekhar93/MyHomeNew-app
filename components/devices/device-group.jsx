import React, { useState, useCallback, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableWithoutFeedback } from 'react-native';
import TextDisplay from '../common/text-display';
import DeviceDisplay from './device-display';
import Styles from '../../styles';
import { ThemeContext } from '../../lib/utils';

export default function DeviceGroup(props) {
  const [isOpen, setOpen] = useState(true); // remember prev state?

  const onHeaderClick = useCallback(() => {
    setOpen(old => !old);
  }, []);

  return (
    <View style={Styles.DeviceGroupContainer}>
      <DeviceGroupHeader title={props.name || 'Unnamed group'} isOpen={isOpen} onPress={onHeaderClick} />
      {isOpen && 
        (props.devices || []).map(device => 
          <DeviceDisplay key={`${device.name}-${device.devId}`} {...device} switchState={props.switchState} />)
      }
    </View>
  );
}

function DeviceGroupHeader(props) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={Styles.DeviceGroupHeader}>
        <TextDisplay size="large" style={{
          marginBottom: 0
        }}>{props.title}</TextDisplay>
        <Ionicons name={`ios-arrow-${props.isOpen? 'up' : 'down'}`} size={32} color={theme.TEXT_COLOR} />
      </View>
    </TouchableWithoutFeedback>
  );
}
