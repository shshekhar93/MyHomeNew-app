import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Button, View } from 'react-native';
import BasePageView from './common/base-page-view';
import TextDisplay from './common/text-display';
import ThemedTextInput from './common/text-input';
import { ThemeContext } from '../lib/utils';
import useToastHelper from '../lib/use-toast-helper';
import * as Settings from '../lib/settings';
import { DEFAULT_SERVER } from '../lib/constants';

export default function ConnectServer({ navigation }) {
  const theme = useContext(ThemeContext);
  const Toast = useToastHelper();
  const [useScanner, setUseScanner] = useState(true);
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const linkStyle = useMemo(
    () => ({
      color: theme.LINK_COLOR,
      textAlign: 'center',
      marginTop: 15,
    }),
    [theme]
  );

  const toggleLoginMethod = useCallback(() => {
    setUseScanner((val) => !val);
  }, []);

  const onIdChange = useCallback((e) => {
    setClientId(e.target.value);
  }, []);

  const onSecretChange = useCallback((e) => {
    setClientSecret(e.target.value);
  }, []);

  const onLogin = useCallback(() => {
    if (!clientId || !clientSecret) {
      Toast.show('Please enter client id and secret', Toast.SHORT);
      return;
    }

    Promise.all([
      Settings.setServerAddress(DEFAULT_SERVER),
      Settings.setClientId(clientId),
      Settings.setClientSecret(clientSecret),
    ])
      .then(() => {
        Toast.show('Logged in successfully', Toast.SHORT);
      })
      .catch(() => {
        Toast.show('Login failed!', Toast.SHORT);
      });
  }, [clientId, clientSecret]);

  return (
    <BasePageView title="Scan QR code to Login">
      <ConnectInstructions useScanner={useScanner} />
      <View
        style={{
          marginTop: 45,
        }}
      >
        {useScanner ? (
          <>
            <Button
              title="Scan QR Code"
              onPress={() => navigation.navigate('Scanner')}
              color={theme.BUTTON_COLOR}
            />
            <TextDisplay onPress={toggleLoginMethod} style={linkStyle}>
              Enter credentials manually
            </TextDisplay>
          </>
        ) : (
          <>
            <ThemedTextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Client ID"
              value={clientId}
              onChange={onIdChange}
            />
            <ThemedTextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Client secret"
              value={clientSecret}
              onChange={onSecretChange}
            />
            <View style={{ marginTop: 15 }}>
              <Button title="Login" onPress={onLogin} color={theme.BUTTON_COLOR} />
            </View>
            <TextDisplay onPress={toggleLoginMethod} style={linkStyle}>
              Scan QR code instead
            </TextDisplay>
          </>
        )}
      </View>
    </BasePageView>
  );
}

function ConnectInstructions({ useScanner }) {
  return (
    <View>
      <TextDisplay style={{ marginBottom: 8 }}>1. Navigate to home.applyed.in</TextDisplay>
      <TextDisplay style={{ marginBottom: 8 }}>2. Login to your account.</TextDisplay>
      <TextDisplay style={{ marginBottom: 8 }}>
        3. Select &apos;Connect to app&apos; option.
      </TextDisplay>
      {useScanner ? (
        <TextDisplay style={{ marginBottom: 8 }}>4. Scan the displayed QR code.</TextDisplay>
      ) : (
        <TextDisplay style={{ marginBottom: 8 }}>
          4. Copy &amp; paste the client id / secret here.
        </TextDisplay>
      )}
    </View>
  );
}
