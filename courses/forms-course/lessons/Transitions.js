import React from "react";
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Button } from "../components/Button";
import colors from "../config/colors";

const w = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // justifyContent: "center"
  },
  buttonContainer: {
    marginHorizontal: 20
  },
  border: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 20,
    backgroundColor: colors.subtle
  },
  image: {
    height: w.width * 0.6,
    alignSelf: "center",
    marginBottom: 40
  },
  formContainer: {
    backgroundColor: colors.primary,
    height: w.height,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3
  }
});

const getFormStyles = animatedValue => [
  styles.formContainer,
  {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [w.height * 0.4, w.height]
        })
      }
    ]
  }
];

const getImageStyles = animatedValue => [
  styles.image,
  {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1]
        })
      }
    ]
  }
];

class Transitions extends React.Component {
  offset = new Animated.Value(1);

  onButtonPress = () => {
    Animated.spring(this.offset, {
      toValue: 0,
      useNativeDriver: true
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.offset.setValue(1)}>
          <Animated.Image
            source={require("../assets/images/cash.png")}
            style={getImageStyles(this.offset)}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button onPress={this.onButtonPress} text="Create Account" />
          <View style={styles.border} />
          <Button onPress={this.onButtonPress} text="Sign in" />
        </View>
        <Animated.View style={getFormStyles(this.offset)} />
      </View>
    );
  }
}

export default Transitions;
