import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import DolarEuroActual from "./DolarEuroActual.js";
import DolarHistorico from "./DolarHistorico.js";

export default function DolarSection() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <DolarEuroActual />
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