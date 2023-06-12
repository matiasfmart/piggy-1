import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import planService from '../Services/PlanService.js';

const Home = () => {
  const [planData, setPlanData] = useState({
    nombre: '',
    ingresos: '',
    ahorro: ''
  });

  const handleInputChange = (name, value) => {
    setPlanData(prevState => ({ ...prevState, [name]: value }));
  };

  const createPlan = async () => {
    const result = await planService.createPlan(planData);
    console.log(result); // result of the post request
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu plan de ahorro:</Text>
      <Text style={styles.texto}>Actualmente no tienes un plan de ahorro activo.</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del plan"
        onChangeText={(value) => handleInputChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresos"
        onChangeText={(value) => handleInputChange('ingresos', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ahorro"
        onChangeText={(value) => handleInputChange('ahorro', value)}
      />
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
    marginBottom:20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    width: '100%',
  }
});

export default Home;
