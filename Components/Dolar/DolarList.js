import React from "react";
import { View, Text } from "react-native";
import DolarValue from "./Dolar";

const DolarList = ({ items, selectedSource }) => {
  // Filtrar los valores según la fuente seleccionada
  const filteredItems =
    selectedSource === "All" ? items : items.filter(item => item.source === selectedSource);

  // Ordenar los valores por fecha en orden ascendente
  const sortedDolarValues = filteredItems.sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  // Invertir el array para mostrar las fechas en orden descendente
  const reversedDolarValues = sortedDolarValues.reverse();

  let currentDate = new Date();

  return (
    <View style={styles.container}>
      {reversedDolarValues.map((dolarValue, index) => {
        // Verificar si la fecha ha cambiado para mostrar el encabezado
        if (dolarValue.date !== currentDate) {
          currentDate = dolarValue.date;
          return (
            <View key={`header-${index}`}>
              <Text style={styles.header}>{currentDate}</Text>
              <DolarValue
                key={index}
                date={dolarValue.date}
                source={dolarValue.source}
                valueSell={dolarValue.value_sell}
                valueBuy={dolarValue.value_buy}
              />
            </View>
          );
        }

        return (
          <DolarValue
            key={index}
            date={dolarValue.date}
            source={dolarValue.source}
            valueSell={dolarValue.value_sell}
            valueBuy={dolarValue.value_buy}
          />
        );
      })}
    </View>
  );
};

const styles = {
  container: {
    flex: 1, // Para que ocupe todo el espacio disponible en la pantalla
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 10,
  },
};

export default DolarList;