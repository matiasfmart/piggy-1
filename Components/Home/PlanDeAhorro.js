// PlanDeAhorro.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Chart from "../Graficos/GraficoPlanAhorro";

export default function PlanDeAhorro({ planData }) {
  const endDate = new Date(planData.fechaDeFinalizacion);
  const today = new Date();
  const remainingDays = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{planData.nombre}</Text>
      <Text style={styles.smallTitle}>Meta de ahorro</Text>
      <Text style={styles.metaAhorro}>${planData.ahorro}</Text>
      <View style={styles.column}>
        <View style={styles.subColumn}>
          <Text style={styles.smallTitle}>Ganancias mensuales</Text>
          <Text style={styles.medText}>${planData.ingresos}</Text>
        </View>
      </View>
      <View style={styles.daysContainer}>
        <Text style={styles.smallTitle}>Días restantes</Text>
        <View style={styles.column}>
          <Text style={styles.bigText}>{remainingDays}</Text>
        </View>
      </View>
      <Chart />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  metaAhorro: {
    fontWeight: "bold",
    fontSize: 40,
    color: "green",
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 40,
  },
  medText: {
    fontWeight: "bold",
    fontSize: 25,
  },
  pendingDays: {
    fontWeight: "bold",
    fontSize: 25,
    marginHorizontal: 15,
    color: "gray",
  },
  column: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 0,
  },
  subColumn: {
    alignItems: "center",
    marginBottom: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  smallTitle: {
    fontWeight: "bold",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  daysContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
