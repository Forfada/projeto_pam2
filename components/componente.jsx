import { Card, Text, Button } from 'react-native-paper';

export default function Componente({ titulo, preco, imagem }) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Cover source={{ uri: imagem }} />
      <Card.Content>
        <Text variant="titleMedium">{titulo}</Text>
        <Text variant="bodyMedium">{preco}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" icon="cart">Comprar</Button>
      </Card.Actions>
    </Card>
  );
}
