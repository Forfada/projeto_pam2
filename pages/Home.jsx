import DogImg from '../assets/images/dog.jpg';
import { ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function Home() {
  return (
    <ScrollView style={{ flex: 1, padding: 16,}}>
      <Card style={{ marginBottom: 16 }}>
        <Card.Cover source={require('../assets/images/dog.jpg')} />
        <Card.Content>
          <Text variant="titleLarge">🐾 Bem-vindo à Vendas e Ordem Online</Text>
          <Text variant="bodyMedium">
            Aqui você encontra animais de Medio a grande porte cheios de amor para alegrar sua vida. 
          </Text>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Text variant="titleMedium">✨ Sobre Nós</Text>
          <Text variant="bodyMedium">
            Somos apaixonados por animais e nosso objetivo é conectar você ao seu novo melhor amigo.
            Trabalhamos com responsabilidade e cuidado, garantindo o bem-estar dos pets (e lucro).
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
