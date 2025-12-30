import React, { useContext, useMemo } from 'react';
import { Dimensions } from 'react-native';

import { ScrollView } from 'react-native';
import { ThemeContext } from '../../lib/utils';

const DEFAULT_PADDING = 15;


export default function BasePageView({ style = {}, children, ...restProps }) {
  const theme = useContext(ThemeContext);
  
  const maxHeight = useMemo(() => {
    const { height } = Dimensions.get('window')
return height - 64;
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: DEFAULT_PADDING,
        backgroundColor: theme.PAGE_BACKGROUND,
        minHeight: 'auto',
        maxHeight,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}
