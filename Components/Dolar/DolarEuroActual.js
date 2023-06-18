import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import DolarEuroList from "./DolarEuroList";
import Service from "../../Services/DolarEuroActualService.js"

const DolarEuroActual = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const jsonData = await Service.fetchDolarEuroData();
      setData(jsonData);
    } catch (error) {
      console.error("Error obtaining current dollar/euro information", error);
    } finally {
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