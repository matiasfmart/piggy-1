import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextInputField from "./TextInputField";
import ErrorText from "./ErrorText";
import SignInService from "../../Services/SignInService.js";
import Logo from "../../assets/logo.png"

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signinError, setSigninError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSignIn = async () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSigninError("");
    setSubmitted(true);

    const fields = [
        { name: "email", value: email, errorMessage: "No puede quedar el campo vacío" },
        { name: "password", value: password, errorMessage: "No puede quedar el campo vacío" },
        { name: "confirmPassword", value: confirmPassword, errorMessage: "No puede quedar el campo vacío" }
      ];
    
      fields.forEach(field => {
        if (field.value === "") {
          setError(field.name, field.errorMessage);
        }
      });
    
      if (email !== "" && !isEmailValid(email)) {
        setError("email", "Correo electrónico inválido");
      }
    
      let hasErrors = fields.some(field => field.value === "" || field.name === "email" && !isEmailValid(field.value));
    
      if (password !== confirmPassword) {
        setConfirmPasswordError("Las contraseñas no coinciden");
        hasErrors = true;
      }

      if (hasErrors) {
        return;
      }

    //metodo para service
    try {
      const data = await SignInService.signIn(email, password);
      navigation.navigate("Login");

    } catch (error) {
      setSigninError(error.message);
    }
  };

  const isEmailValid = (email) => {
    // Expresión regular para verificar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // Aquí puedes implementar la lógica para redirigir al componente de registro
    navigation.navigate("Login");
  };

  const setError = (fieldName, errorMessage) => {
    switch (fieldName) {
      case "email":
        setEmailError(errorMessage);
        break;
      case "password":
        setPasswordError(errorMessage);
        break;
      case "confirmPassword":
        setConfirmPasswordError(errorMessage);
        break;
      default:
        break;
    }
  };



  return (
<View style={styles.container}>
      <Image source={Logo} />
      <Text style={styles.title}>Crear cuenta</Text>
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
      <TextInputField
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <ErrorText error={submitted ? confirmPasswordError : null} />
      <Button title="Crear cuenta" onPress={handleSignIn} />

      <ErrorText error={submitted ? signinError : null} />

      <Text style={styles.login}>¿Ya tienes una cuenta? Inicia sesión</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
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
  register: {
    paddingBottom: 10,
  },
});

export default SignIn;
