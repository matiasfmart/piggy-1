import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Tu plan de ahorro:</Text>
        <Button title="Crear nuevo plan de ahorro" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Home;