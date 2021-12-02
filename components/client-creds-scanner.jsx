import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import TextDisplay from './common/text-display';
import { setServerAddress, setClientId, setClientSecret } from '../lib/settings';
import useToastHelper from '../lib/use-toast-helper';

export default function ClientCredsScanner() {
  const [err, setErr] = useState(null);
  const [hasPermission, setPermission] = useState(false);
  const loggingIn = useRef(false);
  const Toast = useToastHelper();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setPermission(true);
      } else {
        setErr('Please grant camera permission to scan.');
      }
    })();
  }, []);

  const onCredsScanned = useCallback(({ data }) => {
    if (loggingIn.current) {
      return;
    }

    const dataParts = (data || '').split(':');
    const clientId = dataParts.shift();
    const clientSecret = dataParts.shift();
    const hostname = dataParts.join(':');

    if (!clientId || !clientSecret || !hostname) {
      if (Platform.OS === 'android') {
        Toast.show('Invalid QR Code', Toast.SHORT);
        return;
      }
      setErr('Invalid QR scanned!');
      return;
    }

    Toast.show('Scan complete. Logging in..', Toast.SHORT);
    loggingIn.current = true;
    Promise.all([setServerAddress(hostname), setClientId(clientId), setClientSecret(clientSecret)])
      .then(() => {
        Toast.show('Logged in successfully', Toast.SHORT);
      })
      .catch(() => {
        loggingIn.current = false;
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      {err && (
        <TextDisplay size="medium" style={{ color: 'red', marginTop: 16 }}>
          {err}
        </TextDisplay>
      )}
      {hasPermission && (
        <Camera
          autoFocus={Camera.Constants.AutoFocus.on}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={onCredsScanned}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}

export const noop = () => {};
