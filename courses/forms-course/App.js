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

import Validation from "./lessons/Validation";
import Transitions from "./lessons/Transitions";

// const initialRouteName = "Index";
const initialRouteName = "Transitions";

export const routeConfig = {
  Validation: {
    screen: Validation,
    navigationOptions: {
      title: "Validation"
    }
  },
  Transitions: {
    screen: Transitions,
    navigationOptions: {
      title: "Transitions"
    }
  }
};

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: "#fff",
    marginVertical: 20
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
    fontWeight: "bold",
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
