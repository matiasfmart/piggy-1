import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Gasto from './Gasto';
import gastosService from '../../Services/GastosService.js';
import AuthContext from '../../Globals/authContext';
import CustomPicker from '../Picker/CustomPicker';

const GastosList = ({ reloadGastos }) => {
  const [gastos, setGastos] = useState([]);
  const { userAuth } = useContext(AuthContext);
  const [filtroPrioridad, setFiltroPrioridad] = useState('Todas');

  useEffect(() => {
    fetchGastos();
  }, [reloadGastos]);

  const fetchGastos = async () => {
    try {
      const gastos = await gastosService.getGastos(userAuth);
      setGastos(gastos);
    } catch (error) {
      console.error('Error al obtener los gastos:', error);
    }
  };

  const handleEditarGasto = async (id, gastoEditado) => {
    try {
      const updatedGasto = await gastosService.updateGasto(id, gastoEditado); // Pasar el ID y el objeto gasto editado
      const updatedGastos = gastos.map((gasto) => {
        if (gasto.id === updatedGasto.id) {
          return updatedGasto;
        }
        return gasto;
      });
      setGastos(updatedGastos);
    } catch (error) {
      console.error('Error al editar el gasto:', error);
    }
  };

  const handleEliminarGasto = async (gastoId) => {
    try {
      await gastosService.deleteGasto(gastoId);
      const updatedGastos = gastos.filter((gasto) => gasto.id !== gastoId);
      setGastos(updatedGastos);
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  const handleFiltroPrioridad = (value) => {
    setFiltroPrioridad(value);
  };

  const gastosFiltrados = filtroPrioridad === 'Todas' ? gastos : gastos.filter(gasto => gasto.prioridad === filtroPrioridad);

  return (
    <ScrollView>
      <View style={styles.pickerContainer}>
        <CustomPicker
          selectedValue={filtroPrioridad}
          onValueChange={handleFiltroPrioridad}
          options={[
            { label: 'Todas', value: 'Todas' },
            { label: 'Alta', value: 'Alta' },
            { label: 'Media', value: 'Media' },
            { label: 'Baja', value: 'Baja' },
          ]}
        />
      </View>
      {gastosFiltrados.length > 0 ? (
        gastosFiltrados.map((gasto) => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            onEditarGasto={handleEditarGasto}
            onEliminarGasto={handleEliminarGasto}
          />
        ))
      ) : (
        <View style={styles.container}>
          <Text style={styles.centeredText}>No hay gastos agregados</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
});

export default GastosList;