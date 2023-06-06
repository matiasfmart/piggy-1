import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import CustomPicker from '../Picker/CustomPicker';

const GastoForm = ({ onAgregarGasto }) => {
  const [nuevoGastoNombre, setNuevoGastoNombre] = useState('');
  const [nuevoGastoCosto, setNuevoGastoCosto] = useState('');
  const [nuevoGastoPrioridad, setNuevoGastoPrioridad] = useState('alta');

  const opcionesPrioridad = [
    { label: 'Prioridad alta', value: 'alta' },
    { label: 'Prioridad media', value: 'media' },
    { label: 'Prioridad baja', value: 'baja' },
  ];

  const handleAgregarGasto = () => {
    const nuevoGasto = {
      nombre: nuevoGastoNombre,
      prioridad: nuevoGastoPrioridad,
      costo: parseFloat(nuevoGastoCosto)
    };
    onAgregarGasto(nuevoGasto);
    setNuevoGastoNombre('');
    setNuevoGastoCosto('');
    setNuevoGastoPrioridad('baja');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del gasto"
        value={nuevoGastoNombre}
        onChangeText={setNuevoGastoNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Costo del gasto"
        value={nuevoGastoCosto}
        onChangeText={setNuevoGastoCosto}
        keyboardType="numeric"
      />
      <CustomPicker
        selectedValue={nuevoGastoPrioridad}
        onValueChange={setNuevoGastoPrioridad}
        options={opcionesPrioridad}
      />
      <Button title="Agregar Gasto" onPress={handleAgregarGasto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 4,
  },
});

export default GastoForm;