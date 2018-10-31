import React from "react";
import { Text, FlatList, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

class SelectList extends React.Component {
  constructor(props) {
    super(props);
    const selected = props.navigation.getParam("selected", []);

    this.state = {
      selected
    };
  }

  handleSelect = (item, isSelected) => {
    const { navigation } = this.props;

    this.setState(
      state => {
        let selected = state.selected;
        if (isSelected) {
          selected = selected.filter(current => current !== item);
        } else {
          selected.push(item);
        }

        return { selected };
      },
      () => {
        const multi = navigation.getParam("multi", false);
        const onSelect = navigation.getParam("onSelect", () => {});

        if (!multi) {
          onSelect(item);
          navigation.goBack();
        }
      }
    );
  };

  render() {
    const { navigation } = this.props;

    const options = navigation.getParam("options", []);

    return (
      <View style={styles.selectListContainer}>
        <FlatList
          data={options}
          renderItem={({ item }) => {
            const isSelected = this.state.selected.includes(item);
            return (
              <TouchableOpacity
                onPress={() => this.handleSelect(item, isSelected)}
              >
                <View style={styles.selectRow}>
                  <Text style={styles.input}>{item}</Text>

                  {isSelected && (
                    <Image
                      source={require("../../assets/check.png")}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item}
          ItemSeparatorComponent={() => <View style={styles.border} />}
        />
      </View>
    );
  }
}

export default SelectList;
