import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { createStackNavigator } from "react-navigation";
import get from "lodash/get";

import LoginReference from "./lessons/LoginReference";
import RegisterReference from "./lessons/RegisterReference";

import { SelectList } from "./components/Form";

const initialRouteName = "Index";
// const initialRouteName = "LoginReference";
// const initialRouteName = "RegisterReference";

export const routeConfig = {
  LoginReference: {
    screen: LoginReference,
    navigationOptions: {
      title: "Login Reference"
    }
  },
  RegisterReference: {
    screen: RegisterReference,
    navigationOptions: {
      title: "Register Reference"
    }
  },
  SelectList: {
    screen: SelectList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam("title", "Select")
    })
  }
};

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: "#fff",
    marginVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd"
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd"
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  title: {
    fontSize: 16,
    color: "#444"
  }
});

class LessonList extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollview}>
        {Object.keys(routeConfig).map(key => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(key)}
            style={styles.itemContainer}
            key={key}
          >
            <View style={styles.item}>
              <Text style={styles.title}>
                {get(routeConfig[key], "navigationOptions.title", key)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default createStackNavigator(
  {
    ...routeConfig,
    Index: {
      screen: LessonList,
      navigationOptions: {
        title: "Forms - Index"
      }
    }
  },
  { initialRouteName }
);
