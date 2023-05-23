import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DolarEuro = (props) => {
  const getSourceStyles = (source) => {
    switch (source) {
      case "oficial":
        return {
          container: { backgroundColor: "green" },
        };
      case "blue":
        return {
          container: { backgroundColor: "#006ee6" },
        };
      case "oficial_euro":
        return {
          container: { backgroundColor: "#7E4F93" },
        };
      case "blue_euro":
        return {
          container: { backgroundColor: "#006ee6" },
        };
      default:
        return {
          container: { backgroundColor: "gray" },
        };
    }
  };

  const sourceStyles = getSourceStyles(props.source);
  const rawDate = props.date;
  const splitDate = rawDate.split("T")[0];
  const splitParts = splitDate.split("-");
  const formattedDate = `${splitParts[2]}/${splitParts[1]}/${splitParts[0]}`;

  const valorPromedio = props.values.value_avg;
  const valorCompra = props.values.value_sell;
  const valorVenta = props.values.value_buy;

  return (
    <View style={[styles.container, sourceStyles.container]}>
      <View style={styles.column}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{formattedDate}</Text>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{props.source}</Text>
      </View>

      <View style={styles.column}>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Valor Promedio:</Text>
          <Text style={[styles.value, styles.largeValue]}>{valorPromedio}</Text>
        </View>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Valor de Compra:</Text>
          <Text style={[styles.value, styles.largeValue]}>{valorCompra}</Text>
        </View>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Valor de Venta:</Text>
          <Text style={[styles.value, styles.largeValue]}>{valorVenta}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
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

export default DolarEuro;