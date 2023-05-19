import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import blueIcon from "../../src/icons/blue.png";
import greenIcon from "../../src/icons/green.png";

const DolarValue = (props) => {
  const getIconSource = (source) => {
    switch (source) {
      case "Oficial":
        return greenIcon;
      case "Blue":
        return blueIcon;
      default:
        return null;
    }
  };

  const iconSource = getIconSource(props.source);

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
      default:
        return {
          container: { backgroundColor: "gray" },
        };
    }
  };

  const sourceStyles = getSourceStyles(props.source);

  return (
    <View style={[styles.container, sourceStyles.container]}>
      <View style={styles.column}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{props.date}</Text>
        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{props.source}</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Valor Compra:</Text>
          <Text style={styles.value}>{props.valueSell}</Text>
        </View>
        <View style={styles.subColumn}>
          <Text style={styles.label}>Valor Venta:</Text>
          <Text style={styles.value}>{props.valueBuy}</Text>
        </View>
        <View style={styles.iconContainer}>
          {iconSource && <Image source={iconSource} style={styles.icon} />}
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

export default DolarValue;