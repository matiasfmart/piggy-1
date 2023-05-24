import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DolarEuro = (props) => {
  const getSourceStyles = (source) => {
    switch (source) {
      case "Oficial":
        return {
          container: { backgroundColor: "green" },
        };
      case "Blue":
        return {
          container: { backgroundColor: "#006ee6" },
        };
      case "Euro Oficial":
        return {
          container: { backgroundColor: "#7E4F93" },
        };
      case "Euro Blue":
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
  const splitDate = props.date.split("T")[0];
  const splitParts = splitDate.split("-");
  const formattedDate = `${splitParts[2]}/${splitParts[1]}/${splitParts[0]}`;

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
          <Text style={[styles.value, styles.largeValue]}>{props.values.value_avg}</Text>
        </View>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Valor de Compra:</Text>
          <Text style={[styles.value, styles.largeValue]}>{props.values.value_sell}</Text>
        </View>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Valor de Venta:</Text>
          <Text style={[styles.value, styles.largeValue]}>{props.values.value_buy}</Text>
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