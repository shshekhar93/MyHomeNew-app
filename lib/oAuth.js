import { getServerAddress, getClientId, getClientSecret } from "./settings";
import Base64 from 'react-native-base64';

let serverAddress = 'https://home.applyed.in';
let authInfo = '';

async function populateAuthInfo(ensureValidity) {
  serverAddress = await getServerAddress();
  const clientId = await getClientId();
  const clientSecret = await getClientSecret();

  if(ensureValidity && (!clientId || !clientSecret || !serverAddress)) {
    throw new Error('ClientOrSecretUknown');
  }

  authInfo = Base64.encode(`${clientId}:${clientSecret}`);
  if(serverAddress.endsWith('/')) {
    serverAddress = serverAddress.substring(0, serverAddress.length - 1);
  }
}

const uri = path => `${serverAddress}${path}`;

let accessToken = '';

export default async function getAccessToken(refresh) {
  if(!refresh && accessToken) {
    return accessToken;
  }

  if(!authInfo) {
    await populateAuthInfo(true);
  }

  console.log(authInfo);
  return fetch(uri('/token'), {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authInfo}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then(async resp => {
      if(!resp.ok) {
        console.log(await resp.json());
        throw new Error(`LOGIN_ERR_${resp.status}`);
      }

      return resp.json();
    })
    .then(resp => {
      console.log(resp);
      accessToken = resp.access_token;
      return accessToken;
    })
    .catch(err => {
      console.log('Could not get access token:', err.message);
      throw err;
    });
}