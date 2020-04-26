import React, { useContext } from 'react';
import {ScrollView} from 'react-native';
import _omit from 'lodash/omit';
import { ThemeContext } from '../../lib/utils';

const DEFAULT_PADDING = 15;

const PROP_NAMES = [ 'style', 'children', 'title' ];
export default function BasePageView(props) {
  const theme = useContext(ThemeContext);
  const { style = {}, children = [] } = props;
  const restProps = _omit(props, PROP_NAMES);

  return (
    <ScrollView 
      style={{ flex: 1, padding: DEFAULT_PADDING, backgroundColor: theme.PAGE_BACKGROUND, ...style }}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
};
