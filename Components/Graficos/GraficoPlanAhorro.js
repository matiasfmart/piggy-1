import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";

export default function GraficoPlanAhorro() {
    const screenWidth = Dimensions.get("window").width

    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(34, 0, 255, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

  const data = {
    labels: ["Días", "Ahorrado", "Dato"], // optional
    data: [0.4, 0.6, 0.8],
  };

  return (
    <ProgressChart
      data={data}
      width={screenWidth}
      height={220}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegend={false}
    />
  );
}