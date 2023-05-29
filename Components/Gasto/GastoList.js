import React from 'react';
import { View, Text } from 'react-native';
import Gasto from './Gasto';

const GastosList = ({ gastos, selectedPriority, onEditarGasto }) => {
  // Filtrar los gastos según la prioridad seleccionada
  const filteredGastos = gastos.filter(
    (gasto) => selectedPriority === null || gasto.prioridad === selectedPriority || selectedPriority === "Mostrar todos"
  );

  return (
    <View>
      <Text style={styles.title}>Lista de Gastos</Text>
      {filteredGastos.map((gasto, index) => (
        <Gasto key={index} gasto={gasto} onEditarGasto={onEditarGasto} index={index} />
      ))}
    </View>
  );
};

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};

export default GastosList;