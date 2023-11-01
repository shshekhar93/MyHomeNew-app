export const DEFAULT_SERVER = 'https://home.applyed.in';
export const DEV_GROUP_STATE_PREFIX = 'device.group.state.';

export const BASE_SIZES = {
  small: 14,
  normal: 16,
  medium: 18,
  large: 22,
  larger: 24,
  huge: 26,
};

export const deviceGroupStateKey = (devName) => `${DEV_GROUP_STATE_PREFIX}${devName}`;
