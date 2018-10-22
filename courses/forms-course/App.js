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

import Lesson1 from "./lessons/Lesson1";
import Lesson2 from "./lessons/Lesson2";
import Lesson3 from "./lessons/Lesson3";

const initialRouteName = "Index";

export const routeConfig = {
  Lesson1: {
    screen: Lesson1,
    navigationOptions: {
      title: "Lesson 1"
    }
  },
  Lesson2: {
    screen: Lesson2,
    navigationOptions: {
      title: "Lesson 2"
    }
  },
  Lesson3: {
    screen: Lesson3,
    navigationOptions: {
      title: "Lesson 3"
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
