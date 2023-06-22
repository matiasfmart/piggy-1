import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Gasto from './Gasto';

const GastosList = ({ gastos, selectedPriority, onEditarGasto, onEliminarGasto }) => {
  const filteredGastos = gastos.filter(
    (gasto) => selectedPriority === null || gasto.prioridad === selectedPriority || selectedPriority === "Mostrar todos"
  );

  return (
    <ScrollView style={styles.scrollView}>
      {filteredGastos.map((gasto, index) => (
        <Gasto key={index} gasto={gasto} 
               onEditarGasto={(gastoEditado) => onEditarGasto(index, gastoEditado)} 
               onEliminarGasto={() => onEliminarGasto(index)} />
      ))}
    </ScrollView>
  );
};

const styles = {
  scrollView: {
    marginHorizontal: 20,
  },
};

export default GastosList;
