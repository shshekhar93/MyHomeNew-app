import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, Switch, ActivityIndicator, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextDisplay from '../common/text-display';
import PopAndFadeView from '../common/pop-and-fade';
import { ThemeContext } from '../../lib/utils';

export default function DeviceDisplay(props) {
  const theme = useContext(ThemeContext);
  const [executing, setExecuting] = useState(false);
  const [success, setSuccess] = useState(null);

  const switchState = useCallback(isOn => {
    setExecuting(true);
    props.switchState(props.room, props.name, props.devId, isOn)
      .then(success => {
        setSuccess(success);
        setExecuting(false);
      });
  }, [props.room, props.name, props.devId]);


  return (
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
      <TextDisplay>{props.label}</TextDisplay>
      {executing && 
        <ActivityIndicator
          size="small"
          color={ theme.LINK_COLOR }
          style={{
            marginTop: 5,
            marginRight: 10
          }} /> 
      }
      {(!executing && success !== null) &&
        <PopAndFadeView onEnd={() => setSuccess(null)}>
          <Ionicons
            name={success ? 'md-checkmark-circle-outline' : 'md-alert'}
            size={25}
            color={success? theme.SUCCESS_COLOR: theme.ALERT_COLOR}
            style={{
              marginTop: 5,
              marginRight: 10
            }} />
        </PopAndFadeView>
      }
      {(!executing && success == null ) &&
        <Switch
          value={props.state === '100'}
          onValueChange={switchState}
          style={{
            transform: [
              {scaleX: 1.2},
              {scaleY: 1.2}
            ]
          }} /> }
    </View>
  );
};
