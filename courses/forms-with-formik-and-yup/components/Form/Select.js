import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import FieldWrapper from "./FieldWrapper";

import styles from "./styles";

class Input extends React.Component {
  render() {
    const {
      label,
      style,
      validationType,
      validationText,
      value,
      onPress,
      ...rest
    } = this.props;
    return (
      <FieldWrapper
        label={label}
        validationType={validationType}
        validationText={validationText}
      >
        <TouchableOpacity onPress={onPress} style={styles.row}>
          <Text {...rest} style={[styles.input, style]}>
            {value}
          </Text>
          <Image
            source={require("../../assets/chevron.png")}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      </FieldWrapper>
    );
  }
}

export default Input;
