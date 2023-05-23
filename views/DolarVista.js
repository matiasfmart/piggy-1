import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import DolarEuroList from "../Components/Dolar/DolarEuroList.js";
import DolarHistorico from "../Components/Dolar/DolarHistorico.js";

export default function DolarVista() {
  return (
    <ScrollView style={styles.container}>
      <DolarEuroList />
      <DolarHistorico />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});