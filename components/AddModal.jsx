// AddModal.js
import * as React from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  FAB,
} from "react-native-paper";
import { View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Input from "./Input";
import { insert, update } from "../validation/createDB";


const AddModal = ({ editingAnimal, onCloseEdit, children, onSaved }) => {
  const [visible, setVisible] = React.useState(false);
  const [nome, setNome] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [img, setImg] = React.useState("");

  React.useEffect(() => {
    if (editingAnimal) {
      setNome(editingAnimal.nome);
      setPreco(editingAnimal.preco);
      setImg(editingAnimal.img || "");
      setVisible(true);
    }
  }, [editingAnimal]);

  const showModal = () => {
    if (!editingAnimal) {
      setNome("");
      setPreco("");
      setImg("");
    }
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    if (!editingAnimal) {
      setNome("");
      setPreco("");
      setImg("");
    }
    if (onCloseEdit) onCloseEdit();
  };

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert("Permissão para acessar a galeria é necessária!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImg(result.assets[0].uri);
      }
    } catch (e) {
      alert("Erro ao acessar a galeria.");
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!nome.trim() || !preco.trim()) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }

      if (editingAnimal?.id) {
        await update(editingAnimal.id, nome, preco, img);
        alert("Animal atualizado com sucesso!");
      } else {
        await insert(nome, preco, img);
        alert("Animal adicionado com sucesso!");
      }

      if (onSaved) onSaved(); // callback opcional p/ recarregar lista
      hideModal();
    } catch (e) {
      console.error("Erro ao salvar:", e);
      alert("Erro ao salvar no banco.");
    }
  };

  const containerStyle = {
    backgroundColor: "white",
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
              textAlign: "center",
              marginBottom: 20,
              fontSize: 22,
              fontWeight: "600",
            }}
          >
            {editingAnimal ? "Editar Animal" : "Adicionar Animal"}
          </Text>

          <View style={{ marginBottom: 12 }}>
            <Input label="Nome" value={nome} onChangeText={setNome} />
          </View>

          <View style={{ marginBottom: 12 }}>
            <Input label="Preço" value={preco} onChangeText={setPreco} />
          </View>

          <View style={{ marginBottom: 20, alignItems: "center" }}>
            {img ? (
              <Image
                source={{ uri: img }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
            ) : null}
            <Button mode="outlined" icon="image" onPress={pickImage}>
              {img ? "Trocar Imagem" : "Adicionar Imagem"}
            </Button>
          </View>

          <Button mode="contained" onPress={handleSubmit}>
            {editingAnimal ? "Salvar" : "Enviar"}
          </Button>
        </Modal>
      </Portal>

      {children}

      {!editingAnimal && (
        <FAB
          icon="plus"
          label="Adicionar"
          style={{
            position: "absolute",
            right: 16,
            bottom: 80,
          }}
          onPress={showModal}
        />
      )}
    </PaperProvider>
  );
};

export default AddModal;
