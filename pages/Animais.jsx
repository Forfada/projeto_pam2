import * as React from 'react';
import { ScrollView, View, Button, Text } from 'react-native';
import AnimalCard from '../components/AnimalCard';
import AddModal from '../components/AddModal';

const PAGE_SIZE = 10;

//esse array pode vir do backend (???)
const animaisMock = [
  { id: 1, nome: 'Macaco cretino', preco: 'R$ 3400,00', img: require('../assets/images/macaco.jpg') },
  { id: 2, nome: 'Lindo Elefante', preco: 'R$ 50000,00', img: require('../assets/images/elefante.jpg') },
  { id: 3, nome: 'Mauricio', preco: 'R$ 30,00', img: require('../assets/images/porqui.jpg') },
  { id: 4, nome: 'Lontra cega', preco: 'R$ 400,00', img: require('../assets/images/lontra.jpg') },
  { id: 5, nome: 'Macaco cretino', preco: 'R$ 3400,00', img: require('../assets/images/macaco.jpg') },
  { id: 6, nome: 'Lindo Elefante', preco: 'R$ 50000,00', img: require('../assets/images/elefante.jpg') },
  { id: 7, nome: 'Mauricio', preco: 'R$ 30,00', img: require('../assets/images/porqui.jpg') },
  { id: 8, nome: 'Lontra cega', preco: 'R$ 400,00', img: require('../assets/images/lontra.jpg') },
  { id: 9, nome: 'Macaco cretino', preco: 'R$ 3400,00', img: require('../assets/images/macaco.jpg') },
  { id: 10, nome: 'Lindo Elefante', preco: 'R$ 50000,00', img: require('../assets/images/elefante.jpg') },
  { id: 11, nome: 'Mauricio', preco: 'R$ 30,00', img: require('../assets/images/porqui.jpg') },
  { id: 12, nome: 'Lontra cega', preco: 'R$ 400,00', img: require('../assets/images/lontra.jpg') },
  { id: 13, nome: 'Macaco cretino', preco: 'R$ 3400,00', img: require('../assets/images/macaco.jpg') },
  { id: 14, nome: 'Lindo Elefante', preco: 'R$ 50000,00', img: require('../assets/images/elefante.jpg') },
  { id: 15, nome: 'Mauricio', preco: 'R$ 30,00', img: require('../assets/images/porqui.jpg') },
  { id: 16, nome: 'Lontra cega', preco: 'R$ 400,00', img: require('../assets/images/lontra.jpg') },
  { id: 17, nome: 'Macaco cretino', preco: 'R$ 3400,00', img: require('../assets/images/macaco.jpg') },
  { id: 18, nome: 'Lindo Elefante', preco: 'R$ 50000,00', img: require('../assets/images/elefante.jpg') },
  { id: 19, nome: 'Mauricio', preco: 'R$ 30,00', img: require('../assets/images/porqui.jpg') },
  { id: 20, nome: 'Lontra cega', preco: 'R$ 400,00', img: require('../assets/images/lontra.jpg') },
  { id: 21, nome: 'Macaco cretino', preco: 'R$ 3400,00', img: require('../assets/images/macaco.jpg') },
  { id: 22, nome: 'Lindo Elefante', preco: 'R$ 50000,00', img: require('../assets/images/elefante.jpg') },
  { id: 23, nome: 'Mauricio', preco: 'R$ 30,00', img: require('../assets/images/porqui.jpg') },
  { id: 24, nome: 'Lontra cega', preco: 'R$ 400,00', img: require('../assets/images/lontra.jpg') },
];

export default function Animais() {
  const [animais, setAnimais] = React.useState(animaisMock);
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil(animais.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const animaisPagina = animais.slice(startIdx, endIdx);

  return (
    <View style={{ flex: 1 }}>
      <AddModal>
        <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ paddingBottom: 30 }}>
          {animaisPagina.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
          {totalPages > 1 && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
            <Button
              title="Anterior"
              onPress={() => setPage(page - 1)}
              disabled={page === 1}
            />
            <Text style={{ alignSelf: 'center', marginHorizontal: 20 }}>
              Página {page} de {totalPages}
            </Text>
            <Button
              title="Próxima"
              onPress={() => setPage(page + 1)}
              disabled={page === totalPages}
            />
          </View>
        )}
        </ScrollView>
      </AddModal>
    </View>
  );
};
