import * as React from 'react';
import { ScrollView, View, Button, Text, Alert } from 'react-native';
import AnimalCard from '../components/AnimalCard';
import AddModal from '../components/AddModal';
import { select, insert, update, remove } from '../validation/createDB';


const PAGE_SIZE = 10;

export default function Animais() {
  const [animais, setAnimais] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [editingAnimal, setEditingAnimal] = React.useState(null);

  const fetchAnimais = async () => {
    try {
      const animaisDB = await select();
      setAnimais(animaisDB);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchAnimais();
  }, []);

  const handleAddOrEdit = async (animal) => {
    try {
      if (animal.id) {
        await update(animal.id, animal.nome, animal.preco, animal.img);
      } else {
        await insert(animal.nome, animal.preco, animal.img);
      }
      fetchAnimais();
    } catch (e) {
      Alert.alert('Erro', `Não foi possível salvar o animal.\n${e.message || e}`);
      console.log(e);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir este animal?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await remove(id);
            fetchAnimais();
          },
        },
      ]
    );
  };

  const totalPages = Math.ceil(animais.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const animaisPagina = animais.slice(startIdx, endIdx);

  return (
    <View style={{ flex: 1 }}>
      <AddModal
        onSubmit={handleAddOrEdit}
        editingAnimal={editingAnimal}
        onCloseEdit={() => setEditingAnimal(null)}
      >
        <ScrollView style={{ flex: 1, padding: 16 }} contentContainerStyle={{ paddingBottom: 30 }}>
          {animaisPagina.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onEdit={setEditingAnimal}
              onDelete={handleDelete}
            />
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
