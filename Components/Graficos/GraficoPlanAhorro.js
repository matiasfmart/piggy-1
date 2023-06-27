import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

export default function GraficoPlanAhorro({ endDate, today, ingresos, ahorro }) {
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(34, 0, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  // Calcular el progreso actual en función de la fecha actual y la fecha de finalización
  const totalDays = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, totalDays); // Asegurar que los días restantes no sean negativos
  const progress = (totalDays - remainingDays) / totalDays;

  // Calcular el porcentaje de ingresos y ahorro en relación al objetivo
  const ingresosPercentage = (ingresos / ingresos);

  const ahorroPercentage = (ahorro / ingresos) * 10;
  const data = {
    labels: ["Días", "Ahorrado", "Ingresos"],
    data: [progress, ahorroPercentage, ingresosPercentage],
  };

  return (
    <View style={styles.container}>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
});