// PlanDeAhorro.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Chart from '../Graficos/GraficoPlanAhorro';

export default function PlanDeAhorro({ planData }) {
  // calculate remaining days
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
