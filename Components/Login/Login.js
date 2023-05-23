import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation(); // Obtener la instancia de navegación

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = () => {
    // Aquí puedes realizar la lógica de autenticación con el servidor
    // Por simplicidad, este ejemplo solo muestra los valores ingresados en el formulario
    console.log("Email:", email);
    console.log("Password:", password);

    // Redirigir a la HomeView
    navigation.navigate("Plan De Ahorro");
  };

  const handleRegister = () => {
    // Aquí puedes realizar la lógica de autenticación con el servidor
    // Por simplicidad, este ejemplo solo muestra los valores ingresados en el formulario
    console.log("Enviar a componente Register.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button title="Redireccion" onPress={() => navigation.navigate("Plan De Ahorro")}></Button>

      <Text style={styles.register}>¿No tenés una cuenta de Piggy?</Text>
      <Button title="Registrate gratis" onPress={handleRegister} />
    </View>
  );
};


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
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  register: {
    paddingTop: 20,
  }
});

export default Login;