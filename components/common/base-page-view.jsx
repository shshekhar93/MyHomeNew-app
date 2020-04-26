import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, ViewPropTypes } from 'react-native';
import _omit from 'lodash/omit';
import { ThemeContext } from '../../lib/utils';

const DEFAULT_PADDING = 15;

const PROP_NAMES = ['style', 'children'];
export default function BasePageView(props) {
  const theme = useContext(ThemeContext);
  const { style, children } = props;
  const restProps = _omit(props, PROP_NAMES);

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: DEFAULT_PADDING,
        backgroundColor: theme.PAGE_BACKGROUND,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}

BasePageView.defaultProps = {
  style: {},
};

BasePageView.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
};
