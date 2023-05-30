import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
//dolar simplificado para el onclick del grafico
const SimpleDolar = (props) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.column}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{props.date}</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Valor:</Text>
          <Text style={styles.value}>{props.value}</Text>
        </View>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{props.source}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%", 
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  subColumn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  value: {
    fontSize: 14,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default SimpleDolar;