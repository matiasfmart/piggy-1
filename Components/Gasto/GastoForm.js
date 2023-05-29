import React, { useState } from 'react';
import { View, TextInput, Button, Picker, StyleSheet } from 'react-native';

const GastoForm = ({ onAgregarGasto }) => {
  const [nuevoGastoNombre, setNuevoGastoNombre] = useState('');
  const [nuevoGastoCosto, setNuevoGastoCosto] = useState('');
  const [nuevoGastoPrioridad, setNuevoGastoPrioridad] = useState('alta');

  const handleAgregarGasto = () => {
    const nuevoGasto = {
      nombre: nuevoGastoNombre,
      prioridad: nuevoGastoPrioridad,
      costo: parseFloat(nuevoGastoCosto)
    };
    onAgregarGasto(nuevoGasto);
    setNuevoGastoNombre('');
    setNuevoGastoCosto('');
    setNuevoGastoPrioridad('alta');
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
      <Picker
        style={styles.input}
        selectedValue={nuevoGastoPrioridad}
        onValueChange={itemValue => setNuevoGastoPrioridad(itemValue)}
      >
        <Picker.Item label="Prioridad alta" value="alta" />
        <Picker.Item label="Prioridad media" value="media" />
        <Picker.Item label="Prioridad baja" value="baja" />
      </Picker>
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