import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider, FAB } from 'react-native-paper';
import Input from './Input';

const AddModal = (props) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, borderRadius: 12};

  return (
    <PaperProvider>
      <Portal>
        <Modal style={{ flex: 1, margin: 16 }} visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text style={{ textAlign: 'center', marginBottom: 16, fontSize: 24 }}>Adicionar Animais</Text>
          <Input label={"Nome"} />
          <Input label={"Preço"} />
          <Button>Adicionar Imagem</Button>
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