import { AsyncStorage } from 'react-native';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const settingsUpdate = new EventEmitter();

const SERVER_ADDRESS_KEY = 'server_address';
const CLIENT_ID_KEY = 'client_id';
const CLIENT_SECRET_KEY = 'client_secret';

function getValue(key) {
  return AsyncStorage.getItem(key);
}

async function setValue(key, val) {
  await AsyncStorage.setItem(key, val);
  settingsUpdate.emit(key, key, val);
  settingsUpdate.emit('*', key, val);
}

function getServerAddress() {
  return getValue(SERVER_ADDRESS_KEY);
}

function setServerAddress(address) {
  return setValue(SERVER_ADDRESS_KEY, address);
}

function getClientId() {
  return getValue(CLIENT_ID_KEY);
}

function setClientId(id) {
  return setValue(CLIENT_ID_KEY, id);
}

function getClientSecret() {
  return getValue(CLIENT_SECRET_KEY);
}

function setClientSecret(secret) {
  return setValue(CLIENT_SECRET_KEY, secret);
}

async function hasSettingsSaved() {
  const values = await Promise.all([getServerAddress(), getClientId(), getClientSecret()]);
  return values.every(Boolean);
}

function addSettingsListener(key, cb) {
  const hasKey = arguments.length > 1;
  const rKey = hasKey ? key : '*';
  const rCb = hasKey ? cb : key;

  settingsUpdate.addListener(rKey, rCb);
}

function removeSettingsListener(key, cb) {
  const hasKey = arguments.length > 1;
  const rKey = hasKey ? key : '*';
  const rCb = hasKey ? cb : key;

  settingsUpdate.removeListener(rKey, rCb);
}

export {
  getServerAddress,
  setServerAddress,
  getClientId,
  setClientId,
  getClientSecret,
  setClientSecret,
  hasSettingsSaved,
  addSettingsListener,
  removeSettingsListener,
};
