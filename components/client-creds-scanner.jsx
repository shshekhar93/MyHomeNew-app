import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Toast } from 'toastify-react-native';
import TextDisplay from './common/text-display';
import { setServerAddress, setClientId, setClientSecret } from '../lib/settings';

export default function ClientCredsScanner() {
  const [err, setErr] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const loggingIn = useRef(false);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const onCredsScanned = useCallback(async ({ data }) => {
    if (loggingIn.current) {
      return;
    }

    const dataParts = (data || '').split(':');
    const clientId = dataParts.shift();
    const clientSecret = dataParts.shift();
    const hostname = dataParts.join(':');

    if (!clientId || !clientSecret || !hostname) {
      if (Platform.OS === 'android') {
        Toast.success('Invalid QR Code');
        return;
      }
      setErr('Invalid QR scanned!');
      return;
    }

    Toast.show('Scan complete. Logging in..');
    loggingIn.current = true;

    try {
      await Promise.all([
        setServerAddress(hostname),
        setClientId(clientId),
        setClientSecret(clientSecret),
      ]);
      Toast.success('Logged in successfully');
    }
    catch {
      Toast.error('Failed to save credentials!');
      loggingIn.current = false;
    }
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
      {!permission?.granted && (
        <TextDisplay size="medium" style={{ color: 'red', marginTop: 16 }}>
          Please Allow access to camera for scanning QR code.
        </TextDisplay>
      )}
      {permission?.granted && (
        <CameraView
          autoFocus="on"
          facing="back"
          barCodeScannerSettings={{
            barCodeTypes: ['qr'],
          }}
          onBarcodeScanned={onCredsScanned}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}

export const noop = () => {};
