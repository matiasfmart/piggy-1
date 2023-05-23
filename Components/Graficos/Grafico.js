import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const MyChart = ({ data, selectedSource, selectedDataValue }) => {
  if (!data || data.length === 0) {
    return <Text>No hay datos disponibles</Text>;
  }

  const filteredData =
    selectedSource === "All"
      ? data.filter((item) => item.source === "Oficial")
      : data.filter((item) => item.source === selectedSource);

  const recentData = filteredData.slice(0, 10).reverse();
  const labels = recentData.map((item) => {
    const date = new Date(item.date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const values = recentData.map((item) => item[selectedDataValue]);

  return (
    <View>
      <Text>Bezier Line Chart</Text>

      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: values,
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "green",
          backgroundGradientTo: "#006ee6",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffffff",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        formatXLabel={(value, index) => {
          if (recentData.length > 10 && index !== recentData.length - 1) {
            return "";
          }
          return value;
        }}
      />
    </View>
  );
};

export default MyChart;