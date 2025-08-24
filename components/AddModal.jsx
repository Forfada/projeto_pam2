import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider, FAB } from 'react-native-paper';
import { View } from 'react-native';
import Input from './Input';

const AddModal = (props) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    margin: 16,
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 20,
              fontSize: 22,
              fontWeight: '600',
            }}
          >
            Adicionar Animal
          </Text>

          <View style={{ marginBottom: 12 }}>
            <Input label="Nome" />
          </View>

          <View style={{ marginBottom: 12 }}>
            <Input label="Preço" />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Button
              mode="outlined"
              icon="image"
              onPress={() => console.log("Selecionar imagem")}
            >
              Adicionar Imagem
            </Button>
          </View>

          <Button
            mode="contained"
            onPress={() => {
              console.log("Enviar animal"); // aqui no futuro vai chamar o CRUD
              hideModal();
            }}
          >
            Enviar
          </Button>
        </Modal>
      </Portal>

      {props.children}

      <FAB
        icon="plus"
        label="Adicionar"
        style={{
          position: 'absolute',
          right: 16,
          bottom: 80,
        }}
        onPress={showModal}
      />
    </PaperProvider>
  );
};

export default AddModal;
