import React, { useState, useEffect } from "react";
import { StatusBar, Alert, ImageBackground  } from "react-native";
import { StyleSheet, View, ScrollView, Text, TextInput, Button, SafeAreaView } from "react-native";
import DolarList from "../Components/Dolar/DolarList";

export default function DolarValues() {
  const [dolarValues, setDolarValues] = useState([]);
  const [numDays, setNumDays] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../src/backgrounds/dollars_dark.jpg")} style={styles.backgroundImage}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        <View style={styles.centerContainer}>
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
            <DolarList items={dolarValues} />
          )}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
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
    resizeMode: "cover", // Ajusta la imagen para cubrir todo el fondo
  },
  centerContainer: {
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  whiteLetter:{
    color:"white",
  },
  input: {
    width: 200,
    height: 40,
    color:"white",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
