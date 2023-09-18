import React, { useEffect, useState, useCallback, useContext } from 'react';
import _pick from 'lodash/pick';
import { AppState, RefreshControl } from 'react-native';
import BasePageView from '../common/base-page-view';
import DeviceGroup from './device-group';
import { getDevices, setDevState } from '../../lib/api';
import { ThemeContext } from '../../lib/utils';

const COMMON_PROP_NAMES = ['name', 'isActive', 'room'];

async function getAllDevices(comparator) {
  const devices = await getDevices();

  const devsMappedToRoom = devices.reduce((allRooms, thisDev) => {
    const roomName = thisDev.room || 'unknown';
    const thisRoom = allRooms[roomName] || [];

    const leads = thisDev.leads || [];
    const leadsInThisDev = leads.map((lead) => ({
      ...lead,
      ..._pick(thisDev, COMMON_PROP_NAMES),
    }));

    return {
      ...allRooms,
      [roomName]: [...thisRoom, ...leadsInThisDev],
    };
  }, {});

  return Object.keys(devsMappedToRoom)
    .sort(comparator)
    .map(
      (room) => ({
        name: room,
        devices: devsMappedToRoom[room],
      }),
      []
    );
}

export default function DeviceList() {
  const theme = useContext(ThemeContext);
  const [devGroups, setDevGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setDevGroups(await getAllDevices());
    setRefreshing(false);
  }, []);

  useEffect(() => {
    onRefresh();

    const subscription = AppState.addEventListener('change', (appState) => {
      if (appState === 'active') {
        onRefresh();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const switchState = useCallback((room, devName, devId, isOn) => {
    const state = isOn ? '100' : '0';
    return setDevState(devName, devId, state)
      .then(() => {
        // success
        setDevGroups((oldGroups) =>
          oldGroups.map((grp) => {
            if (grp.name !== room) {
              return grp;
            }
            return {
              ...grp,
              devices: grp.devices.map((dev) =>
                dev.name === devName && dev.devId === devId ? { ...dev, state } : dev
              ),
            };
          })
        );
        return true;
      })
      .catch((err) => {
        /* eslint-disable-next-line no-console */
        console.error(`setState ${devName}-${devId} to ${isOn} failed:`, err.message);
        return false;
      });
  }, []);

  return (
    <BasePageView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.COLOR5]} />
      }
    >
      {devGroups.map((devGrp) => (
        <DeviceGroup key={devGrp.name} switchState={switchState} {...devGrp} />
      ))}
    </BasePageView>
  );
}
