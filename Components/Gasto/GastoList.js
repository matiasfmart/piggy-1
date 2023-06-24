import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Gasto from './Gasto';
import gastosService from '../../Services/GastosService.js';
import AuthContext from '../../Globals/authContext';

const GastosList = ({ reloadGastos }) => {
  const [gastos, setGastos] = useState([]);
  const { userAuth } = useContext(AuthContext);

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
      console.error("Error al editar el gasto:", error);
    }
  };

  const handleEliminarGasto = async (gastoId) => {
    try {
      await gastosService.deleteGasto(gastoId);
      const updatedGastos = gastos.filter(gasto => gasto.id !== gastoId);
      setGastos(updatedGastos);
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  return (
    <ScrollView>
      {
        gastos.length > 0 ?
            gastos.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                onEditarGasto={handleEditarGasto}
                onEliminarGasto={handleEliminarGasto}
              />
            ))
          :
          <View style={styles.container}>
            <Text style={styles.centeredText}>No hay gastos agregados</Text>
          </View>
      }
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
});

export default GastosList;