import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const Gasto = ({ gasto, onEditarGasto, onEliminarGasto }) => {
  const { id, nombre, prioridad, costo } = gasto;
  const [modalVisible, setModalVisible] = useState(false);
  const [editNombre, setEditNombre] = useState(nombre);
  const [editCosto, setEditCosto] = useState(costo);

  // Definir el color del rectángulo basado en la prioridad
  const getPriorityStyle = (prioridad) => {
    switch (prioridad) {
      case 'Alta':
        return {
          container: { backgroundColor: 'red' },
        };
      case 'Media':
        return {
          container: { backgroundColor: 'orange' },
        };
      case 'Baja':
        return {
          container: { backgroundColor: 'green' },
        };
      default:
        return {
          container: { backgroundColor: 'green' },
        };
    }
  };

  const priorityStyle = getPriorityStyle(gasto.prioridad);

  const handleEditarGasto = () => {
    const gastoEditado = {
      id,
      nombre: editNombre,
      prioridad,
      costo: parseFloat(editCosto),
    };
    onEditarGasto(id, gastoEditado);
    setModalVisible(false);
  };

  const handleEliminarGasto = () => {
    onEliminarGasto(id);
  };

  return (
    <View style={[styles.gastoContainer, priorityStyle.container]}>
      <Text>{nombre}</Text>
      <Text>Prioridad: {prioridad}</Text>
      <Text>Costo: ${costo}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.editButton}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEliminarGasto}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del gasto"
            value={editNombre}
            onChangeText={setEditNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Costo del gasto"
            value={editCosto.toString()}
            onChangeText={setEditCosto}
            keyboardType="numeric"
          />
          
          <Button title="Guardar" onPress={handleEditarGasto} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  gastoContainer: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  editButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  deleteButton: {
    color: 'black',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 4,
    width: '100%',
  },
});

export default Gasto;