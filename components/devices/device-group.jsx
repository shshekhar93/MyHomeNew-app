import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableWithoutFeedback } from 'react-native';
import TextDisplay from '../common/text-display';
import DeviceDisplay from './device-display';
import Styles from '../../styles';
import { ThemeContext, noop } from '../../lib/utils';
import { DeviceProp } from '../../lib/custom-prop-types';

export default function DeviceGroup({ name, devices, switchState }) {
  const [isOpen, setOpen] = useState(true); // remember prev state?

  const onHeaderClick = useCallback(() => {
    setOpen((old) => !old);
  }, []);

  return (
    <View style={Styles.DeviceGroupContainer}>
      <DeviceGroupHeader title={name || 'Unnamed group'} isOpen={isOpen} onPress={onHeaderClick} />
      {isOpen &&
        devices.map((device) => (
          <DeviceDisplay
            key={`${device.name}-${device.devId}`}
            {...device}
            switchState={switchState}
          />
        ))}
    </View>
  );
}

DeviceGroup.defaultProps = {
  devices: [],
};

DeviceGroup.propTypes = {
  name: PropTypes.string.isRequired,
  devices: PropTypes.arrayOf(DeviceProp),
  switchState: PropTypes.func.isRequired,
};

function DeviceGroupHeader({ title, isOpen, onPress }) {
  const theme = useContext(ThemeContext);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={Styles.DeviceGroupHeader}>
        <TextDisplay
          size="large"
          style={{
            marginBottom: 0,
          }}
        >
          {title}
        </TextDisplay>
        <Ionicons name={`ios-arrow-${isOpen ? 'up' : 'down'}`} size={32} color={theme.TEXT_COLOR} />
      </View>
    </TouchableWithoutFeedback>
  );
}

DeviceGroupHeader.defaultProps = {
  onPress: noop,
};

DeviceGroupHeader.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
