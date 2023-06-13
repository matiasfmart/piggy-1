import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import Logo from "../../assets/logo.png"

export default function LogOutSection() {

    const handleLogOut = () => {
        return false
    }

  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text style={styles.title}>Cerrar sesión</Text>
      <Text style={styles.register}>¿Estás seguro que quieres cerrar sesión?</Text>
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
