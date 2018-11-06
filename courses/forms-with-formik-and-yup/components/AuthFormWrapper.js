import React from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { H1, H2 } from "./Text";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 3,
    paddingVertical: 15,
    paddingHorizontal: 20
  }
});

export class AuthFormWrapper extends React.Component {
  render() {
    const { children, header, subHeader } = this.props;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.card}>
            <H1>{header}</H1>
            <H2>{subHeader}</H2>
            {children}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
