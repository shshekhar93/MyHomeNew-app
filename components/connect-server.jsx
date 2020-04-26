import React from 'react';
import { Button, View } from 'react-native';
import BasePageView from './common/base-page-view';
import TextDisplay from './common/text-display';
import { NavigationProp } from '../lib/custom-prop-types';
import { noop } from '../lib/utils';

export default function ConnectServer({ navigation }) {
  return (
    <BasePageView title="Scan QR code to Login">
      <ConnectInstructions />
      <View
        style={{
          marginTop: 45,
        }}
      >
        <Button title="Scan QR Code" onPress={() => navigation.navigate('Scanner')} />
        <TextDisplay onPress={noop} style={{ color: 'blue', textAlign: 'center', marginTop: 15 }}>
          Enter credentials manually
        </TextDisplay>
      </View>
    </BasePageView>
  );
}

ConnectServer.propTypes = {
  navigation: NavigationProp.isRequired,
};

function ConnectInstructions() {
  return (
    <View>
      <TextDisplay>1. Navigate to home.applyed.in</TextDisplay>
      <TextDisplay>2. Login to your account.</TextDisplay>
      <TextDisplay>3. Select &apos;Connect to app&apos; option.</TextDisplay>
      <TextDisplay>4. Scan the displayed QR code.</TextDisplay>
    </View>
  );
}
