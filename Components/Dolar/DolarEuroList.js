import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DolarEuro from "./DolarEuro";

const API_URL = "https://api.bluelytics.com.ar/v2/latest";

const DolarEuroList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valor de las monedas del día de hoy</Text>
      {data && (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dólar</Text>
            <View style={styles.column}>
              <DolarEuro
                date={data.last_update}
                source="oficial"
                values={data.oficial}
              />
              <DolarEuro
                date={data.last_update}
                source="blue"
                values={data.blue}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Euro</Text>
            <View style={styles.column}>
              <DolarEuro
                date={data.last_update}
                source="oficial_euro"
                values={data.oficial_euro}
              />
              <DolarEuro
                date={data.last_update}
                source="blue_euro"
                values={data.blue_euro}
              />
            </View>
          </View>
        </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default DolarEuroList;