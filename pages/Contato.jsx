import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Contato() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="titleLarge">📞 Contato</Text>
      <Text variant="bodyMedium">Email: lojanadasuspeita@gmail.com</Text>
      <Text variant="bodyMedium">WhatsApp: (15) 99999-9999</Text>
      <Text variant="bodyMedium">Endereço: Av. Brasil, 123 - Sorocaba</Text>
    </View>
  );
}
