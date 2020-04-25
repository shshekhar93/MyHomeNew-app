import React, { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableWithoutFeedback } from 'react-native';
import TextDisplay from '../common/text-display';
import DeviceDisplay from './device-display';

export default function DeviceGroup(props) {
  const [isOpen, setOpen] = useState(true); // remember prev state?

  const onHeaderClick = useCallback(() => {
    setOpen(old => !old);
  }, []);

  return (
    <View style={{
      flex: 0,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 7,
      backgroundColor: 'white',
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: isOpen ? 8 : 0,
      marginBottom: 15
    }}>
      <DeviceGroupHeader title={props.name || 'Unnamed group'} isOpen={isOpen} onPress={onHeaderClick} />
      {isOpen && 
        // <>
        //   <DeviceDisplay label="Bedroom Tubelight" switchState={() => {}} state="100" />
        //   <DeviceDisplay label="Bedroom TV" switchState={() => {}} state="0" />
          
        // </>
        (props.devices || []).map(device => 
          <DeviceDisplay key={`${device.name}-${device.devId}`} {...device} switchState={props.switchState} />)
      }
    </View>
  );
}

function DeviceGroupHeader(props) {
  return (
    <TouchableWithoutFeedback style={{flex: 0 }} onPress={props.onPress}>
      <View style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8
      }}>
        <TextDisplay size="large" style={{
          flex: 0,
          marginBottom: 0
        }}>{props.title}</TextDisplay>
        <Ionicons name={`ios-arrow-${props.isOpen? 'up' : 'down'}`} size={32} color="black" />
      </View>
    </TouchableWithoutFeedback>
  );
}
