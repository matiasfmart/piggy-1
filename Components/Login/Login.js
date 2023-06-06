import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import TextInputField from "./TextInputField";
import ErrorText from "./ErrorText";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    setSubmitted(true);

    if (email === "" && password === "") {
      setEmailError("No puede quedar el campo vacío");
      setPasswordError("No puede quedar el campo vacío");
      return;
    }

    if (email === "") {
      setEmailError("No puede quedar el campo vacío");
      return;
    }

    if (password === "") {
      setPasswordError("No puede quedar el campo vacío");
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError("Correo electrónico inválido");
      return;
    }
    try {
      // Realizar la solicitud de inicio de sesión al backend
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Verificar el código de respuesta
      if (response.ok) {
        // Si la respuesta es exitosa, redirigir a la pantalla de inicio de sesión
        navigation.navigate("Plan De Ahorro");
      } else {
        // Si la respuesta no es exitosa, mostrar el mensaje de error en la interfaz
        const errorResponse = await response.json();
        setLoginError(errorResponse.error);
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setLoginError("Error en el inicio de sesión");
    }
  };

  const isEmailValid = (email) => {
    // Expresión regular para verificar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    // Aquí puedes implementar la lógica para redirigir al componente de registro
    console.log("Enviar a componente Register.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInputField
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <ErrorText error={submitted ? emailError : null} />
      <TextInputField
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ErrorText error={submitted ? passwordError : null} />
      <Button title="Iniciar sesión" onPress={handleLogin} />

      <ErrorText error={submitted ? loginError : null} />

      <Text style={styles.register}>¿No tenés una cuenta de Piggy?</Text>
      <Button title="Registrate gratis" onPress={handleRegister} />
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
    paddingTop: 20,
  },
});

export default Login;