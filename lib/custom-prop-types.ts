import PropTypes from 'prop-types';

export const NavigationProp = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  addListener: PropTypes.func.isRequired,
  isFocused: PropTypes.func.isRequired,
});

export const DeviceProp = PropTypes.shape({
  devId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  state: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
});
