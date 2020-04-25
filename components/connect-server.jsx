import React, { useState, useCallback } from 'react';
import { Button, View, TextInput } from 'react-native';
import BasePageView from './common/base-page-view';
import TextDisplay from './common/text-display';
import ClientCredsScanner from './client-creds-scanner';

export default function ConnectServer({ navigation }) {
  return (
    <BasePageView title="Scan QR code to Login">
      <ConnectInstructions />
      <View style={{
        marginTop: 45 
      }}>
        <Button
          title="Scan QR Code"
          onPress={() => navigation.navigate('Scanner')} />
        <TextDisplay
          onPress={() => setShowTextFields(true)}
          style={{ color: 'blue', textAlign: 'center', marginTop: 15 }}
        >Enter credentials manually</TextDisplay>
      </View>
    </BasePageView>
  );
};

function ConnectInstructions() {
  return (
    <View>
      <TextDisplay style={{fontSize: 16}}>
        1. Navigate to home.applyed.in
      </TextDisplay>
      <TextDisplay>
        2. Login to your account.
      </TextDisplay>
      <TextDisplay>
        3. Select 'Connect to app' option.
      </TextDisplay>
      <TextDisplay>
        4. Scan the displayed QR code.
      </TextDisplay>
    </View>
  );
}
