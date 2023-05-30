import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import DolarEuroList from "./DolarEuroList";

const DolarEuroActual = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://api.bluelytics.com.ar/v2/latest");
      const json = await response.json();
      setData(json);
      setIsLoading(false);
    } catch (error) {
      console.error("Error obteniendo la información del dolar/euro actual", error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valor de las monedas del día de hoy</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <>
          {data && (
            <View>
              <Text style={styles.lastUpdate}>
                Última actualización: {data.last_update}
              </Text>
              <DolarEuroList prop={data} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  lastUpdate: {
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default DolarEuroActual;