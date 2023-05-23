import React, { useState, useEffect } from "react";
import { StatusBar, Alert } from "react-native";
import { StyleSheet, View, ScrollView, Text, TextInput, Button, SafeAreaView } from "react-native";
import DolarList from '../Dolar/DolarList.js';
import MyChart from "../Graficos/Grafico";
import CustomPicker from "../Picker/CustomPicker";

export default function DolarValues() {
  const [dolarValues, setDolarValues] = useState([]);
  const [numDays, setNumDays] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedDataValue, setSelectedDataValue] = useState("value_sell");
  
  const getDolarValues = async () => {
    setIsLoading(true);

    const response = await fetch(
      `https://api.bluelytics.com.ar/v2/evolution.json?days=${numDays * 2}`
    );
    const json = await response.json();
    setDolarValues(json);

    setIsLoading(false);
  };

  useEffect(() => {
    getDolarValues();
  }, []);

  const handleUpdate = () => {
    const parsedNumDays = parseInt(numDays);
    if (parsedNumDays <= 0) {
      Alert.alert("Error", "El número de días debe ser mayor a cero.");
      return;
    }

    getDolarValues();
  };

  const options = [
    { label: "Todos", value: "All" },
    { label: "Valor dolar oficial", value: "Oficial" },
    { label: "Valor dolar blue", value: "Blue" },
  ];

  const options2 = [
    { label: "Valor compra", value: "value_sell" },
    { label: "Valor venta", value: "value_buy" },
  ];

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
          <View style={styles.centerContainer}>
          <Text style={styles.title}>Valor del dolar Histórico</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.whiteLetter}>Ingrese el número de días:</Text>
              <TextInput
                style={styles.input}
                value={numDays}
                onChangeText={setNumDays}
                keyboardType="numeric"
              />
              <Button title="Actualizar" onPress={handleUpdate} />
            </View>
            {isLoading ? (
              <Text>Cargando...</Text>
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
                <MyChart data={dolarValues} selectedSource={selectedSource} selectedDataValue={selectedDataValue} />
                <DolarList items={dolarValues} selectedSource={selectedSource} />
              </>
            )}
          </View>
        </ScrollView>
        <StatusBar style="auto" />

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
    color: "white",
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
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});