import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithNativeFeedback,
  Platform,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import colors from "../config/colors";

let Touchable = TouchableOpacity;
if (Platform.OS === "android") {
  Touchable = TouchableWithNativeFeedback;
}

const styles = StyleSheet.create({
  backgroundBase: {
    backgroundColor: colors.primary,
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center"
  },
  containerDisabled: {
    opacity: 0.5
  },
  textBase: {
    color: "#e8e9ea",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 10
  }
});

const getContainerStyles = ({ disabled }) => {
  const s = [styles.backgroundBase];
  if (disabled) s.push(styles.containerDisabled);
  return s;
};

export class Button extends React.Component {
  render() {
    const { onPress, text, disabled } = this.props;
    return (
      <Touchable onPress={onPress} disabled={disabled}>
        <View style={getContainerStyles(this.props)}>
          {disabled && <ActivityIndicator />}
          <Text style={styles.textBase}>{text}</Text>
        </View>
      </Touchable>
    );
  }
}
