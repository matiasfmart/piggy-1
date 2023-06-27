import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import CustomPicker from '../Picker/CustomPicker';
import gastosService from '../../Services/GastosService.js';
import AuthContext from '../../Globals/authContext';

const GastoForm = ({ onGastoCreado }) => {
  const [nuevoGastoNombre, setNuevoGastoNombre] = useState('');
  const [nuevoGastoCosto, setNuevoGastoCosto] = useState('');
  const [nuevoGastoPrioridad, setNuevoGastoPrioridad] = useState('Alta');
  const { userAuth } = useContext(AuthContext);

  const opcionesPrioridad = [
    { label: 'Prioridad alta', value: 'Alta' },
    { label: 'Prioridad media', value: 'Media' },
    { label: 'Prioridad baja', value: 'Baja' },
  ];

  const handleAgregarGasto = async () => {
    try {
      const nuevoGasto = {
        nombre: nuevoGastoNombre,
        prioridad: nuevoGastoPrioridad,     
        costo: parseFloat(nuevoGastoCosto),
        id_usuario: userAuth,
      };

      const response = await gastosService.addNewGasto(nuevoGasto);
      console.log('Nuevo gasto agregado:', response);

      setNuevoGastoNombre('');
      setNuevoGastoCosto('');
      setNuevoGastoPrioridad('Alta');
      onGastoCreado(); // Actualiza el estado en GastosView y vuelve a cargar GastosList
    } catch (error) {
      console.error('Error al crear el gasto:', error);
    }
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
      <View style={styles.pickerContainer}>
        <CustomPicker
          selectedValue={nuevoGastoPrioridad}
          onValueChange={setNuevoGastoPrioridad}
          options={opcionesPrioridad}
        />
      </View>
      <Button title="Agregar Gasto" onPress={handleAgregarGasto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 4,
    width: '100%',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
});

export default GastoForm;