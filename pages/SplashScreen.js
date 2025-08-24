/* n vou utilizar mais, porem vou deixar para algum possivel uso futuro*/
import React, { useEffect } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";

export default function SplashScreen({ navigation }) {
useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace("MainTabs"); 
  }, 3000);

  return () => clearTimeout(timer);
}, [navigation]);


  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});
