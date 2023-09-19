import AsyncStorage from '@react-native-async-storage/async-storage';
/* eslint-disable-next-line import/extensions */
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter.js';

const settingsUpdate = new EventEmitter();

const SERVER_ADDRESS_KEY = 'server_address';
const CLIENT_ID_KEY = 'client_id';
const CLIENT_SECRET_KEY = 'client_secret';
export const THEME_KEY = 'theme';

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

function setThemeName(themeName) {
  return setValue(THEME_KEY, themeName);
}

function getThemeName() {
  return getValue(THEME_KEY);
}

async function hasSettingsSaved() {
  const values = await Promise.all([getServerAddress(), getClientId(), getClientSecret()]);
  return values.every(Boolean);
}

function addSettingsListener(key, cb) {
  const hasKey = arguments.length > 1;
  const rKey = hasKey ? key : '*';
  const rCb = hasKey ? cb : key;

  return settingsUpdate.addListener(rKey, rCb);
}

export {
  getServerAddress,
  setServerAddress,
  getClientId,
  setClientId,
  getClientSecret,
  setClientSecret,
  getThemeName,
  setThemeName,
  hasSettingsSaved,
  addSettingsListener,
};
