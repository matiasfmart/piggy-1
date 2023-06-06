import React from "react";
import { TextInput, StyleSheet } from "react-native";

class TextInputField extends React.Component {
  render() {
    const { placeholder, value, onChangeText, secureTextEntry } = this.props;
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TextInputField;