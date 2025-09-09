import * as React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Provider as PaperProvider, Appbar, ProgressBar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SplashScreen from "expo-splash-screen";
import {createDB} from "./validation/createDB";

import Home from "./pages/Home";
import Animais from "./pages/Animais";
import Contato from "./pages/Contato";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let value = 0;
    const totalTime = 5000; // 5 segundos
    const stepTime = 100; // intervalo de atualização
    const increment = stepTime / totalTime; // quanto aumenta a cada tick
    
    async function initializeDB() {
      try {
        await createDB();
      } catch (error) {
        console.log(`Erro ao criar o banco de dados: ${error}`);
      }
    }
    
    initializeDB();

    const interval = setInterval(() => {
      value += increment;
      if (value >= 1) {
        clearInterval(interval);
        setProgress(1);
        setTimeout(async () => {
          setAppIsReady(true);
          await SplashScreen.hideAsync();
        }, 300);
      } else {
        setProgress(value);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require("./assets/images/icon.png")} style={styles.logo} />
        <ProgressBar progress={progress} color="#6200ee" style={styles.progress} />
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Appbar.Header>
          <Appbar.Content title="Vendas e Ordem Online" />
        </Appbar.Header>

        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#6200ee",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") iconName = "home";
              else if (route.name === "Animais") iconName = "paw";
              else if (route.name === "Contato") iconName = "phone";

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Animais" component={Animais} />
          <Tab.Screen name="Contato" component={Contato} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 350,
    height: 400,
    resizeMode: "contain",
    marginBottom: 20,
  },
  progress: {
    width: 230,
    height: 6,
    borderRadius: 3,
  },
});
