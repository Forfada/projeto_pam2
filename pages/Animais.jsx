import * as React from 'react';
import { ScrollView, View, Button, Text } from 'react-native';
import AnimalCard from '../components/AnimalCard';
import AddModal from '../components/AddModal';
import { select } from '../validation/preparedStatements';

const PAGE_SIZE = 10;

export default function Animais() {
  const [animais, setAnimais] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
  async function fetchAnimais() {
    try {
      const animaisDB = await select();
      setAnimais(animaisDB);
    } catch (error) {
      console.log(error);
    }
  }
  fetchAnimais();
}, []);
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
