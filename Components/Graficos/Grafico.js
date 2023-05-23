import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const MyChart = ({ data, selectedSource, selectedDataValue }) => {
  if (!data || data.length === 0) {
    return <Text>No hay datos disponibles</Text>;
  }

  const filteredData =
    selectedSource === "All"
      ? data.filter((item) => item.source === "Oficial" || item.source === "Blue")
      : data.filter((item) => item.source === selectedSource);

  const recentData = filteredData.slice(0, 20).reverse();
  const labels = recentData
    .map((item) => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()+1}`;
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  const datasets = [];

  if (selectedSource === "All") {
    const oficialData = recentData.filter((item) => item.source === "Oficial");
    datasets.push({
      data: oficialData.map((item) => item[selectedDataValue]),
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
    });

    const blueData = recentData.filter((item) => item.source === "Blue");
    datasets.push({
      data: blueData.map((item) => item[selectedDataValue]),
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    });
  } else {
    datasets.push({
      data: recentData.map((item) => item[selectedDataValue]),
      color: selectedSource === "Oficial" ? (opacity = 1) => `rgba(0, 255, 0, ${opacity})` : (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    });
  }

  return (
    <View>
      <Text>Bezier Line Chart</Text>

      <LineChart
        data={{
          labels,
          datasets,
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#ffffff",
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
          if (recentData.length > 10 && index % 2 !== 0) {
            return "";
          }
          return value;
        }}
      />
    </View>
  );
};

export default MyChart;