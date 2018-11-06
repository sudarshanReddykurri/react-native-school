import React from "react";
import { TextInput } from "react-native";
import FieldWrapper from "./FieldWrapper";
import styles from "./styles";

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
