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

  const handleInputChange = (name, value) => {
    setPlanData(prevState => ({ ...prevState, [name]: value }));
  };

  const createPlan = async () => {
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
      <TextInput
        style={styles.input}
        placeholder="Nombre del plan"
        onChangeText={(value) => handleInputChange('nombre', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresos mensuales"
        onChangeText={(value) => handleInputChange('ingresos', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Meta de ahorro"
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
    marginBottom: 20
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