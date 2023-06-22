import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import GastosList from "./GastoList";
import CustomPicker from "../Picker/CustomPicker";
import GastoForm from "./GastoForm";
import gastosService from "../../Services/GastosService.js";
import AuthContext from "../../Globals/authContext";


const GastoView = () => {

  const { userAuth } = useContext(AuthContext);
  const [gastos, setGastos] = useState([]);

  const fetchGastos = async () => {
    const data = await gastosService.getGastos(userAuth);
    if (data.length > 0) {
      setGastos(data);
    }
  };

  useEffect(() => {
    console.log('El estado "gastos" se actualizó:', gastos);
  }, [gastos]);

  const createGasto = async (nuevoGasto) => {

    try {
      const data = { nombre: nuevoGasto.nombre, costo: nuevoGasto.costo, prioridad: nuevoGasto.prioridad, id_usuario: userAuth };
      const result = await gastosService.addNewGasto(data);
      console.log(result);
      fetchGastos();
      // Navegar de regreso a la pantalla de inicio con el parámetro 'planCreated'
      // navigation.navigate("Plan De Ahorro", { planCreated: true });
    } catch (error) {
      console.error("Error al crear el gasto:", error);
      // Manejar el error
    }
  };

  const updateGasto = async (updateGasto) => {

    try {
      const data = { nombre: updateGasto.nombre, costo: updateGasto.costo, prioridad: updateGasto.prioridad };
      const result = await gastosService.updateGasto(updateGasto.id, data);
      console.log(result);
      fetchGastos();
      // Navegar de regreso a la pantalla de inicio con el parámetro 'planCreated'
      // navigation.navigate("Plan De Ahorro", { planCreated: true });
    } catch (error) {
      console.error("Error al editar el gasto:", error);
      // Manejar el error
    }
  };

  const deleteGasto = async (idGasto) => {

    try {
      const result = await gastosService.deleteGasto(idGasto);
      console.log(result);
      fetchGastos();
      // Navegar de regreso a la pantalla de inicio con el parámetro 'planCreated'
      // navigation.navigate("Plan De Ahorro", { planCreated: true });
    } catch (error) {
      console.error("Error al eliminar el gasto:", error);
      // Manejar el error
    }
  };

  useEffect(() => {
    fetchGastos();
  }, [userAuth]);

  useEffect(() => {
    fetchGastos();
  }, [userAuth]);

  const opciones = [
    { label: "Mostrar todos", value: "Mostrar todos" },
    { label: "Prioridad alta", value: "alta" },
    { label: "Prioridad media", value: "media" },
    { label: "Prioridad baja", value: "baja" },
  ];

  const [filtroPrioridad, setFiltroPrioridad] = useState(null);

  const handlePickerChange = (itemValue) => {
    setFiltroPrioridad(itemValue);
  };

  const handleAgregarGasto = (nuevoGasto) => {
    createGasto(nuevoGasto);
  };

  const handleEditarGasto = (gastoEditado) => {
    updateGasto(gastoEditado)
  };

  const handleEliminarGasto = (id) => {
    deleteGasto(id)
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <CustomPicker
          selectedValue={filtroPrioridad}
          onValueChange={handlePickerChange}
          options={opciones}
        />
      </View>

      <View style={styles.gastosListContainer}>
        <GastosList gastos={gastos} selectedPriority={filtroPrioridad} 
                    onEditarGasto={handleEditarGasto} onEliminarGasto={handleEliminarGasto} />
      </View>

      <View style={styles.gastoFormContainer}>
        <GastoForm onAgregarGasto={handleAgregarGasto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gastosListContainer: {
    flex: 1,
  },
  gastoFormContainer: {
    marginBottom: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
  },
});

export default GastoView;
