import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DolarEuro from "./DolarEuro";

const DolarEuroList = ({ prop }) => {
  console.log(prop)
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dólar</Text>
        <View style={styles.column}>
          <DolarEuro
            date={prop.last_update}
            source="Oficial"
            values={prop.oficial}
          />
          <DolarEuro
            date={prop.last_update}
            source="Blue"
            values={prop.blue}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Euro</Text>
        <View style={styles.column}>
          <DolarEuro
            date={prop.last_update}
            source="Euro Oficial"
            values={prop.oficial_euro}
          />
          <DolarEuro
            date={prop.last_update}
            source="Euro Blue"
            values={prop.blue_euro}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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