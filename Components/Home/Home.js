import React, { useState, useContext } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../Globals/authContext';
import planService from '../../Services/PlanService.js';

const Home = () => {
  const navigation = useNavigation();
  const { userAuth } = useContext(AuthContext);
  const [planData, setPlanData] = useState({
    nombre: '',
    ingresos: '',
    ahorro: ''
  });
  const [errorMessages, setErrorMessages] = useState({});

  const handleInputChange = (name, value) => {
    setPlanData(prevState => ({ ...prevState, [name]: value }));
  };

  const createPlan = async () => {
    const errors = {};

    // Validar nombre del plan
    if (planData.nombre.trim() === "") {
      errors.nombre = "Ingrese un nombre válido para el plan";
    }

    // Validar ingresos mensuales
    const ingresos = parseFloat(planData.ingresos);
    if (isNaN(ingresos) || ingresos <= 0) {
      errors.ingresos = "Ingrese un valor numérico mayor a cero para los ingresos mensuales";
    }

    // Validar meta de ahorro
    const ahorro = parseFloat(planData.ahorro);
    if (isNaN(ahorro) || ahorro <= 0) {
      errors.ahorro = "Ingrese un valor numérico mayor a cero para la meta de ahorro";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const data = { id_usuario: userAuth, ...planData };
      const result = await planService.createPlan(data);
      console.log(result);
      // Navegar de regreso a la pantalla de inicio con el parámetro 'planCreated'
      navigation.navigate("Plan De Ahorro", { planCreated: true });
    } catch (error) {
      console.error("Error al crear el plan:", error);
      // Manejar el error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu plan de ahorro:</Text>
      <Text style={styles.texto}>Actualmente no tienes un plan de ahorro activo.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del plan"
          onChangeText={(value) => handleInputChange('nombre', value)}
        />
        <View style={styles.errorContainer}>
          {errorMessages.nombre && <Text style={styles.errorText}>{errorMessages.nombre}</Text>}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresos mensuales"
          onChangeText={(value) => handleInputChange('ingresos', value)}
          keyboardType="numeric"
        />
        <View style={styles.errorContainer}>
          {errorMessages.ingresos && <Text style={styles.errorText}>{errorMessages.ingresos}</Text>}
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Meta de ahorro"
          onChangeText={(value) => handleInputChange('ahorro', value)}
          keyboardType="numeric"
        />
        <View style={styles.errorContainer}>
          {errorMessages.ahorro && <Text style={styles.errorText}>{errorMessages.ahorro}</Text>}
        </View>
      </View>
      <Button title="Crear nuevo plan de ahorro" onPress={createPlan} />
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
  texto: {
    marginBottom: 20
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  errorContainer: {
    height: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
  }
});

export default Home;