import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import _omit from 'lodash/omit';
import TextDisplay from './text-display';

const DEFAULT_PADDING = 15;

const PROP_NAMES = [ 'style', 'children', 'title' ];
export default function BasePageView(props) {
  const { style = {}, children = [], title = '' } = props;
  const restProps = _omit(props, PROP_NAMES);

  return (
    <ScrollView 
      style={{ flex: 1, padding: DEFAULT_PADDING, ...style }}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
};
