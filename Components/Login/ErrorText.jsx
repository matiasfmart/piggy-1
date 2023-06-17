import React from "react";
import { Text, StyleSheet } from "react-native";

const ErrorText = ({ error }) => {
  return (
    <Text style={error ? styles.error : styles.emptyError}>
      {error || " "}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyError: {
    height: 20,
    marginBottom: 10,
  },
});

export default ErrorText;