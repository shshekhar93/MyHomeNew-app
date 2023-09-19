import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, Switch, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextDisplay from '../common/text-display';
import PopAndFadeView from '../common/pop-and-fade';
import { ThemeContext } from '../../lib/utils';
import styles from '../../styles';

export default function DeviceDisplay({ name, devId, state, room, label, switchState }) {
  const theme = useContext(ThemeContext);
  const [executing, setExecuting] = useState(false);
  const [success, setSuccess] = useState(null);

  const onSwitchChange = useCallback(
    (isOn) => {
      setExecuting(true);
      switchState(room, name, devId, isOn).then((opSuccess) => {
        setSuccess(opSuccess);
        setExecuting(false);
      });
    },
    [room, name, devId]
  );

  return (
    <View style={styles.DeviceDisplay}>
      <TextDisplay>{label}</TextDisplay>
      {executing && (
        <ActivityIndicator
          size="small"
          color={theme.LINK_COLOR}
          style={{
            marginTop: 5,
            marginRight: 10,
          }}
        />
      )}
      {!executing && success !== null && (
        <PopAndFadeView onEnd={() => setSuccess(null)}>
          <Ionicons
            name={success ? 'md-checkmark-circle-outline' : 'md-alert'}
            size={25}
            color={success ? theme.SUCCESS_COLOR : theme.ALERT_COLOR}
            style={{
              marginTop: 5,
              marginRight: 10,
            }}
          />
        </PopAndFadeView>
      )}
      {!executing && success == null && (
        <Switch
          value={state === '100'}
          onValueChange={onSwitchChange}
          style={{
            transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
          }}
        />
      )}
    </View>
  );
}

DeviceDisplay.propTypes = {
  switchState: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  devId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  state: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
