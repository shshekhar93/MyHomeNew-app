import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback, useRef } from 'react';

export function useSavedState(key, defaultValue, serialization) {
  const [value, setValue] = useState(defaultValue);
  const valueRef = useRef(value);

  useEffect(() => {
    (async () => {
      const savedValue = await AsyncStorage.getItem(key);
      if (savedValue !== null) {
        let typedValue = savedValue;
        if (serialization) {
          typedValue = serialization.deserialize(savedValue);
        }

        valueRef.current = typedValue;
        setValue(typedValue);
      }
    })();
  }, []);

  const update = useCallback((valueGetter) => {
    const newValue =
      typeof valueGetter === 'function' ? valueGetter(valueRef.current) : valueGetter;
    valueRef.current = newValue;
    setValue(newValue);

    let serializedValue = newValue;
    if (serialization) {
      serializedValue = serialization.serialize(newValue);
    }
    AsyncStorage.setItem(key, serializedValue);
  }, []);

  return [value, update];
}

const toString = (v) => `${v}`;

export const Serialization = {
  Boolean: {
    serialize: toString,
    deserialize: (v) => v === 'true',
  },
  Number: {
    serialize: toString,
    deserialize: (v) => +v,
  },
  JSON: {
    serialize: (v) => JSON.stringify(v),
    deserialize: (v) => JSON.parse(v),
  },
};
