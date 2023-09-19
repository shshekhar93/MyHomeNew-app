import React, { useCallback, useContext, useState } from 'react';
import { TextInput } from 'react-native';
import _omit from 'lodash/omit';
import { fontSize, ThemeContext } from '../../lib/utils';

export default function ThemedTextInput(props) {
  const theme = useContext(ThemeContext);
  const [hasFocus, setHasFocus] = useState(false);
  const { style, size, onFocus, onBlur, children } = props;
  const restProps = _omit(props, ['style', 'size', 'children', 'onFocus', 'onBlur']);

  const onFocusHandler = useCallback(
    (e) => {
      setHasFocus(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const onBlurHandler = useCallback(
    (e) => {
      setHasFocus(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur]
  );

  return (
    <TextInput
      style={{
        fontSize: fontSize(size),
        marginBottom: 8,
        color: theme.TEXT_COLOR,
        placeholderTextColor: `${theme.TEXT_COLOR}64`,
        backgroundColor: theme.CONTROL_BACKGROUND,
        border: `solid 1px ${hasFocus ? theme.CONTROL_BRODER_FOCUSSED : theme.CONTROL_BORDER}`,
        fontWeight: '300',
        padding: 10,
        outline: 'none',
        ...style,
      }}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      {...restProps}
    >
      {children}
    </TextInput>
  );
}
