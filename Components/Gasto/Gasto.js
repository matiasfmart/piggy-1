import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Gasto = ({ gasto }) => {
  const { nombre, prioridad, costo } = gasto;

  // Definir el color del rectángulo basado en la prioridad
  const getPriorityStyle = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return {
          container: { backgroundColor: 'red' },
        };
      case "media":
        return {
          container: { backgroundColor: 'orange' },
        };
      case "baja":
        return {
          container: { backgroundColor: 'yellow' },
        };
      default:
        return {
          container: { backgroundColor: 'green' },
        };
    }
  };

  const priorityStyle = getPriorityStyle(gasto.prioridad);

  return (
    <View style={[styles.gastoContainer, priorityStyle.container]}>
      <Text>{nombre}</Text>
      <Text>Prioridad: {prioridad}</Text>
      <Text>Costo: ${costo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gastoContainer: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Gasto;