import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, FAB} from 'react-native-paper';
import AnimalCard from '../components/AnimalCard';

//esse array pode vir do backend (???)
const animaisMock = [
  { id: 1, nome: 'Macaco cretino', preco: 'R$ 3400,00', img: require('../assets/images/macaco.jpg') },
  { id: 2, nome: 'Lindo Elefante', preco: 'R$ 50000,00', img: require('../assets/images/elefante.jpg') },
  { id: 3, nome: 'Mauricio', preco: 'R$ 30,00', img: require('../assets/images/porqui.jpg') },
  { id: 4, nome: 'Lontra cega', preco: 'R$ 400,00', img: require('../assets/images/lontra.jpg') },
];

export default function Animais() {
  const [animais, setAnimais] = React.useState(animaisMock);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 16,  }} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {animais.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        label="Adicionar"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 80,
        }}
        onPress={() => console.log('Futuro: abrir modal para adicionar')}
      />
    </View>
  );
};
