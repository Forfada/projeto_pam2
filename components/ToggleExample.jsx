import * as React from 'react';
import { ToggleButton } from 'react-native-paper';
import { View } from 'react-native-web';

const ToggleExample = () => {
  const [value, setValue] = React.useState('left');

  return (
    <View style={{ display: 'flex', justifyContent: 'center' }}>
      <ToggleButton.Group
      onValueChange={value => setValue(value)}
      value={value}>
      <ToggleButton icon="format-align-left" value="left" />
      <ToggleButton icon="format-align-right" value="right" />
      </ToggleButton.Group>
    </View>
  );
};

export default ToggleExample;