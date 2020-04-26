import {StyleSheet} from 'react-native';

export function border(borderWidth, borderColor, borderRadius) {
  return { borderWidth, borderColor, borderRadius };
}

const onlyOfType = (type, val) => (typeof val === type ? val : undefined);

export function padding(paddingTop, paddingRight, paddingBottom, paddingLeft) {
  if(arguments.length === 1) {
    paddingRight = paddingBottom = paddingLeft = paddingTop;
  }

  if(arguments.length === 2) {
    paddingLeft = paddingRight;
    paddingBottom = paddingTop;
  }

  const onlyNumber = onlyOfType.bind(null, 'number');

  return {
    paddingTop: onlyNumber(paddingTop),
    paddingRight: onlyNumber(paddingRight),
    paddingBottom: onlyNumber(paddingBottom),
    paddingLeft: onlyNumber(paddingLeft)
  };
}

export function flex(grow, dir, justifyContent, alignItems) {
  const onlyString = onlyOfType.bind(null, 'string');
  return {
    flex: grow,
    flexDirection: onlyString(dir), 
    justifyContent: onlyString(justifyContent),
    alignItems: onlyString(alignItems)
  };
}

export default StyleSheet.create({
  DeviceGroupContainer: {
    flex: 0,
    backgroundColor: '#1D2830',
    marginBottom: 15,
    ...border(0, null, 7),
    ...padding(null, 12, 4, 12)
  },

  DeviceGroupHeader: {
    ...flex(0, 'row', 'space-between'),
    ...padding(8, null)
  },

  MenuOption: {
    fontSize:18
  },

  NO_GROW: { flex: 0 }
});