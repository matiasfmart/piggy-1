import {useContext} from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/logo.png";

import AuthContext, {defaultAuth} from "../../Globals/authContext";
import Storage from "../../Services/asyncStorage";


export default function LogOutSection() {
  const navigation = useNavigation();
  const { setUserAuth } = useContext(AuthContext);

  const handleLogOut = () => {
    try {
      setUserAuth(defaultAuth);
      Storage.clearAll();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar el error aquí o lanzar una excepción para ser manejada en un nivel superior
    }
  };
  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text style={styles.title}>Cerrar sesión</Text>
      <Text style={styles.register}>
        ¿Estás seguro de que quieres cerrar sesión?
      </Text>
      <Button title="Cerrar Sesión" onPress={handleLogOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  register: {
    paddingBottom: 10,
  },
});