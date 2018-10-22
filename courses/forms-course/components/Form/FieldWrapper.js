import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
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

const getValidationStyle = (type, animatedValue) => {
  const s = [];

  if (type === "success") {
    s.push(styles.successMessage);
  } else {
    s.push(styles.errorMessage);
  }

  s.push({
    opacity: animatedValue,
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 1]
        })
      }
    ]
  });

  return s;
};

class FieldWrapper extends React.Component {
  animatedValue = new Animated.Value(0);

  componentDidMount() {
    this.slideValidationText(this.props);
  }

  componentDidUpdate(prevProps) {
    this.slideValidationText(this.props, prevProps);
  }

  slideValidationText = (props, prevProps) => {
    if (!prevProps) return;

    if (props.validationText) {
      Animated.spring(this.animatedValue, { toValue: 1 }).start();
    }
  };

  render() {
    const { label, children, validationText, validationType } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>{label}</Text>
        {children}
        <View style={styles.border} />
        <View style={styles.validationContainer}>
          <Animated.Text
            style={getValidationStyle(validationType, this.animatedValue)}
          >
            {validationText}
          </Animated.Text>
        </View>
      </View>
    );
  }
}

export default FieldWrapper;
