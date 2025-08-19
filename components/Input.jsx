import * as React from 'react';
import { TextInput } from 'react-native-paper';

const Input = ({label}) => {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label={label}
      value={text}
      mode='outlined'
      onChangeText={text => setText(text)}
    />
  );
};

export default Input;