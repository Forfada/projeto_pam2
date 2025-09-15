import * as React from 'react';
import { TextInput } from 'react-native-paper';

const Input = ({ label, value, onChangeText }) => {
  return (
    <TextInput
      label={label}
      value={value}
      mode='outlined'
      onChangeText={onChangeText}
    />
  );
};

export default Input;