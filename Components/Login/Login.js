import React, { useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TextInputField from "./TextInputField";
import ErrorText from "./ErrorText";
import LoginService from "../../Services/LoginService";
import Logo from "../../assets/logo.png"
import AuthContext from "../../Globals/authContext";

const Login = () => {
  const {userAuth, setUserAuth} = useContext(AuthContext);
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
  
    const fields = [
      { name: "email", value: email, errorMessage: "No puede quedar el campo vacío" },
      { name: "password", value: password, errorMessage: "No puede quedar el campo vacío" },
    ];
  
    const setError = (fieldName, errorMessage) => {
      switch (fieldName) {
        case "email":
          setEmailError(errorMessage);
          break;
        case "password":
          setPasswordError(errorMessage);
          break;
        default:
          break;
      }
    };
  
    fields.forEach(field => {
      if (field.value === "") {
        setError(field.name, field.errorMessage);
      }
    });
  
    if (email !== "" && !isEmailValid(email)) {
      setError("email", "Correo electrónico inválido");
    }
  
    let hasErrors = fields.some(field => field.value === "" || field.name === "email" && !isEmailValid(field.value));
  
    if (hasErrors) {
      return;
    }


    try {
      const data = await LoginService.login(email, password);
      setUserAuth(data.userId)
      
    } catch (error) {
      if (error.message === "Credenciales inválidas") {
        setIncorrectPasswordError("Credenciales inválidas");
      } else {
        setLoginError(error.message);
      }
    }
  }


  const isEmailValid = (email) => {
    // Expresión regular para verificar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    // Aquí puedes implementar la lógica para redirigir al componente de registro
    navigation.navigate("Signin");
  };

  return (
    <View style={styles.container}>
      <Image source={Logo}/>
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

export default Login;
