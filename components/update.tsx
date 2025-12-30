import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, ActivityIndicator, Linking } from 'react-native';
import Constants from 'expo-constants';
import { gt } from 'semver';
import BasePageView from './common/base-page-view';
import TextDisplay from './common/text-display';
import { getLatestAppManifest } from '../lib/api';
import { getServerAddress } from '../lib/settings';
import { Toast } from '../lib/toast';

function AppUpdate({ isUpdating, setUpdating }) {
  const [hasUpdate, setHasUpdate] = useState(false);

  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const { version } = Constants.manifest;
      try {
        const manifest = await getLatestAppManifest();
        const latestVersion = manifest.version;
        if (gt(latestVersion, version)) {
          setHasUpdate(true);
          setDownloadUrl(manifest.url);
        }
      }
      catch {
        Toast.error('Checking for updates failed.');
      }
    })();
  }, []);

  useEffect(() => {
    if (hasUpdate) {
      Alert.alert(
        'New update available',
        'We have a new version of the '
        + 'app available for download. '
        + 'Would you like to proceed with the update?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              setHasUpdate(false);
            },
            style: 'cancel',
          },
          {
            text: 'Update now',
            onPress: async () => {
              setUpdating(true);
            },
          },
        ],
      );
    }
  }, [hasUpdate]);

  useEffect(() => {
    if (!isUpdating) {
      return;
    }

    getServerAddress()
      .then((server) => {
        if (!downloadUrl) {
          throw new Error('INVALID_MANIFEST');
        }

        return Linking.openURL(`${server}${downloadUrl}`);
      })
      .catch((/* err */) => {
        Toast.error('Download update failed..');
      })
      .finally(() => {
        setUpdating(false);
        setHasUpdate(false);
      });
  }, [isUpdating]);

  if (!isUpdating) {
    return null;
  }

  return (
    <BasePageView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" />
      <TextDisplay style={{ marginTop: 10 }}>Downloading update...</TextDisplay>
    </BasePageView>
  );
}

AppUpdate.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  setUpdating: PropTypes.func.isRequired,
};

export default AppUpdate;
