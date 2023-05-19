import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({ selectedValue, onValueChange, options }) => {
  return (
    <View style={styles.container}>
      <Text>Seleccione una opción:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300, // Ajusta el valor según el ancho deseado
  },
  picker: {
    backgroundColor: "rgba(0, 255, 0, 0.5)",
    color: "#ffffff",
    flex: 1,
  },
});

export default CustomPicker;