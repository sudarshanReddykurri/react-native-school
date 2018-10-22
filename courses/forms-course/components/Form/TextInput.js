import React from "react";
import { TextInput, StyleSheet } from "react-native";
import FieldWrapper from "./FieldWrapper";
import colors from "../../config/colors";

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingVertical: 8,
    fontWeight: "500",
    color: colors.primary
  }
});

class Input extends React.Component {
  render() {
    const {
      label,
      style,
      validationType,
      validationText,
      ...rest
    } = this.props;
    return (
      <FieldWrapper
        label={label}
        validationType={validationType}
        validationText={validationText}
      >
        <TextInput {...rest} style={[styles.input, style]} />
      </FieldWrapper>
    );
  }
}

export default Input;
