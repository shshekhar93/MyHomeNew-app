import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../lib/utils';

export function border(borderWidth, borderColor, borderRadius) {
  return { borderWidth, borderColor, borderRadius };
}

/* eslint-disable-next-line valid-typeof */
const onlyOfType = (type, val) => (typeof val === type ? val : undefined);

export function padding(paddingTop, paddingRight, paddingBottom, paddingLeft) {
  const pt = paddingTop;
  let pr = paddingRight;
  let pb = paddingBottom;
  let pl = paddingLeft;
  if (arguments.length === 1) {
    pr = pt;
    pb = pt;
    pl = pt;
  }

  if (arguments.length === 2) {
    pl = pr;
    pb = pt;
  }

  const onlyNumber = onlyOfType.bind(null, 'number');

  return {
    paddingTop: onlyNumber(pt),
    paddingRight: onlyNumber(pr),
    paddingBottom: onlyNumber(pb),
    paddingLeft: onlyNumber(pl),
  };
}

export function flex(grow, dir, justifyContent, alignItems) {
  const onlyString = onlyOfType.bind(null, 'string');
  return {
    flex: grow,
    flexDirection: onlyString(dir),
    justifyContent: onlyString(justifyContent),
    alignItems: onlyString(alignItems),
  };
}

export const useStyles = () => {
  const theme = useContext(ThemeContext);

  return StyleSheet.create({
    DeviceGroupContainer: {
      flex: 0,
      backgroundColor: theme.CONTROL_BACKGROUND,
      marginBottom: 15,
      minHeight: 'auto',
      ...border(0, null, 7),
      ...padding(null, 12, 4, 12),
    },

    DeviceGroupHeader: {
      minHeight: 'auto',
      ...flex(0, 'row', 'space-between'),
      ...padding(8, null),
    },

    DeviceDisplay: {
      minHeight: '42px',
      ...flex(0, 'row', 'space-between', 'center'),
      ...padding(8),
    },

    MenuOption: {
      fontSize: 18,
    },

    NO_GROW: { flex: 0 },
  });
};
