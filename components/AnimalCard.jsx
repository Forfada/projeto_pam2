import * as React from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';

export default function AnimalCard({ animal, onEdit, onDelete }) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Cover source={animal.img ? { uri: animal.img } : require('../assets/images/dog.jpg')} />
      <Card.Content>
        <Text variant="titleMedium">{animal.nome}</Text>
        <Text variant="bodyMedium">{animal.preco}</Text>
      </Card.Content>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          padding: 8,
          gap: 8,
        }}
      >
        <Button
          mode="contained"
          icon="cart"
          style={{ flex: 1 }}
          onPress={() => console.log('Comprar', animal.nome)}
        >
          Comprar
        </Button>

        <Button
          mode="outlined"
          icon="pencil"
          style={{ flex: 1 }}
          onPress={() => onEdit(animal)}
        >
          Editar
        </Button>

        <Button
          mode="outlined"
          icon="delete"
          style={{ flex: 1 }}
          onPress={() => onDelete(animal.id)}
        >
          Excluir
        </Button>
      </View>
    </Card>
  );
}
