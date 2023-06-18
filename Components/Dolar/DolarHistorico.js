import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import DolarList from "../Dolar/DolarList.js";
import MyChart from "../Graficos/GraficoDolarHistorico.js";
import CustomPicker from "../Picker/CustomPicker";
import fetchDolarHistoricoData from "../../Services/DolarHistoricoService.js";

export default function DolarValues() {
  const [dolarValues, setDolarValues] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [numDays, setNumDays] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState("Oficial");
  const [selectedDataValue, setSelectedDataValue] = useState("value_sell");
  const [showDolarList, setShowDolarList] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDolarHistoricoData();
      setDolarValues(data);
      setFilteredData(data.slice(0, numDays * 2));
    } catch (error) {
      console.error("Error obteniendo la información del dolar histórico", error);
    }
    setIsLoading(false);
  };

  const handleUpdate = () => {
    const parsedNumDays = parseInt(numDays);
    if (parsedNumDays <= 0) {
      Alert.alert("Error", "El número de días debe ser mayor a cero.");
      return;
    } else if (parsedNumDays > 730) {
      Alert.alert("Error", "Solo se pueden ver los valores históricos del último año!");
      return;
    }
    setFilteredData(dolarValues.slice(0, parsedNumDays * 2));
  };

  const options = [
    { label: "Valor dolar oficial", value: "Oficial" },
    { label: "Valor dolar blue", value: "Blue" },
  ];

  const options2 = [
    { label: "Valor compra", value: "value_sell" },
    { label: "Valor venta", value: "value_buy" },
  ];

  const handleOpenDolarList = () => {
    setShowDolarList(true);
  };

  const handleCloseDolarList = () => {
    setShowDolarList(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Valor del dolar Histórico</Text>
          <View style={styles.inputContainer}>
            <Text>Ingrese el número de días:</Text>
            <TextInput
              style={styles.input}
              value={numDays}
              onChangeText={setNumDays}
              keyboardType="numeric"
            />
            <Button title="Actualizar" onPress={handleUpdate} />
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : (
            <>
              <View style={styles.pickerContainer}>
                <CustomPicker
                  selectedValue={selectedSource}
                  onValueChange={(itemValue) => setSelectedSource(itemValue)}
                  options={options}
                />
              </View>
              <View style={styles.pickerContainer}>
                <CustomPicker
                  selectedValue={selectedDataValue}
                  onValueChange={(itemValue) => setSelectedDataValue(itemValue)}
                  options={options2}
                />
              </View>
              <MyChart
                data={filteredData}
                selectedSource={selectedSource}
                selectedDataValue={selectedDataValue}
              />
              <Button
                title={`Ver dolar individual de los últimos ${numDays} dias`}
                onPress={handleOpenDolarList}
              />
            </>
          )}
        </View>
      </ScrollView>
      <StatusBar style="auto" />

      {/* Modal para mostrar el DolarList */}
      <Modal visible={showDolarList} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Valores individuales por fecha</Text>
            <TouchableWithoutFeedback onPress={handleCloseDolarList}>
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView style={styles.modalContent}>
            <DolarList
              items={filteredData}
              selectedSource={"All"}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  whiteLetter: {
    color: "white",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalCloseText: {
    fontSize: 16,
    color: "blue",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});