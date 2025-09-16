import * as React from 'react';
import { ScrollView, View, Alert, Pressable, Text, StyleSheet } from 'react-native';
import AnimalCard from '../components/AnimalCard';
import AddModal from '../components/AddModal';
import { select, remove } from '../validation/createDB';

const PAGE_SIZE = 3;

export default function Animais() {
  const [animais, setAnimais] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [editingAnimal, setEditingAnimal] = React.useState(null);

  const fetchAnimais = async () => {
    try {
      const animaisDB = await select();
      setAnimais(animaisDB);
      const totalPages = Math.max(Math.ceil(animaisDB.length / PAGE_SIZE), 1);
      if (page > totalPages) setPage(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchAnimais();
  }, []);

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

  const totalPages = Math.max(Math.ceil(animais.length / PAGE_SIZE), 1);
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const animaisPagina = animais.slice(startIdx, endIdx);

  return (
    <View style={{ flex: 1 }}>
      <AddModal
        editingAnimal={editingAnimal}
        onCloseEdit={() => setEditingAnimal(null)}
        onSaved={fetchAnimais}
      >
        <ScrollView
          style={{ flex: 1, padding: 16 }}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {animaisPagina.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onEdit={setEditingAnimal}
              onDelete={handleDelete}
            />
          ))}

         
          <View style={styles.paginationContainer}>
            {/* Botão Anterior */}
            <Pressable
              style={[styles.button, page === 1 && styles.disabled]}
              onPress={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
            >
              <Text style={styles.buttonText}>«</Text>
            </Pressable>

            {/* Botões de páginas numeradas */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Pressable
                key={p}
                style={[styles.button, p === page && styles.activeButton]}
                onPress={() => setPage(p)}
              >
                <Text style={[styles.buttonText, p === page && styles.activeButtonText]}>
                  {p}
                </Text>
              </Pressable>
            ))}

            {/* Botão Próxima */}
            <Pressable
              style={[styles.button, page === totalPages && styles.disabled]}
              onPress={() => setPage(Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
            >
              <Text style={styles.buttonText}>»</Text>
            </Pressable>
          </View>
        </ScrollView>
      </AddModal>
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    gap: 6,
  },
  button: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  activeButton: {
    backgroundColor: '#bdbdbd',
  },
  buttonText: {
    color: '#424242',
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
  },
  activeButtonText: {
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    shadowOpacity: 0,
    elevation: 0,
  },
});
