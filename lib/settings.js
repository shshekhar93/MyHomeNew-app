import { AsyncStorage } from 'react-native';

const SERVER_ADDRESS_KEY = 'server_address';
const CLIENT_ID_KEY = 'client_id';
const CLIENT_SECRET_KEY = 'client_secret';

function getValue(key) {
  return AsyncStorage.getItem(key);
}

function setValue(key, val) {
  return AsyncStorage.setItem(key, val);
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

export {
  getServerAddress,
  setServerAddress,
  getClientId,
  setClientId,
  getClientSecret,
  setClientSecret,
  hasSettingsSaved,
};
