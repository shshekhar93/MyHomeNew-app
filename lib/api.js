import getAccessToken from './oAuth';
import { getServerAddress } from './settings';

function responseHandler(API_NAME, fn, args = []) {
  return async (resp) => {
    if (resp.status === 401) {
      await getAccessToken(true);
      return fn && fn(...args);
    }

    if (!resp.ok) {
      throw new Error(`${API_NAME}_ERROR`);
    }
    return resp.json();
  };
}

export async function getDevices() {
  const serverAddress = await getServerAddress();
  const accessToken = await getAccessToken();
  return fetch(`${serverAddress}/v1/devices`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(responseHandler('GET_DEVS', getDevices, Array.from(arguments)));
}

export function getDeviceState(/* devName */) {
  return Promise.reject(new Error('NOT_IMPLEMENTED'));
}

export async function setDevState(devName, devId, newState) {
  const serverAddress = await getServerAddress();
  const accessToken = await getAccessToken();
  return fetch(`${serverAddress}/v1/devices/${devName}/set-state`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      switchId: devId,
      newState,
    }),
  }).then(responseHandler('SET_STATE', setDevState, Array.from(arguments)));
}
