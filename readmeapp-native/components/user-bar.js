import React, { Component } from "react";
import { View, Text } from "react-native";

export default class UserBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomColor: "rgba(121,148,229,.23)",
          borderBottomWidth: 1,
          paddingBottom: 20
        }}
      >
        <Text
          style={{
            color: "#7994E5"
          }}
        >
          Readme
        </Text>
        <Text>{user.name}</Text>
      </View>
    );
  }
}
