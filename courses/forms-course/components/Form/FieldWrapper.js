import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../config/colors";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 0
  },
  labelText: {
    color: colors.subtle,
    fontSize: 18
  },
  border: {
    borderBottomColor: colors.subtle,
    borderBottomWidth: 1
  },
  validationContainer: {
    minHeight: 25,
    marginTop: 5
  },
  errorMessage: {
    color: "#ba5361",
    fontWeight: "500"
  },
  successMessage: {
    color: "#4bc350",
    fontWeight: "500"
  }
});

const getValidationStyle = type =>
  type === "success" ? styles.successMessage : styles.errorMessage;

class FieldWrapper extends React.Component {
  render() {
    const { label, children, validationText, validationType } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>{label}</Text>
        {children}
        <View style={styles.border} />
        <View style={styles.validationContainer}>
          <Text style={getValidationStyle(validationType)}>
            {validationText}
          </Text>
        </View>
      </View>
    );
  }
}

export default FieldWrapper;
