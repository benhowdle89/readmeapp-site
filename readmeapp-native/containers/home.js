import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import StatusBarPaddingIOS from "react-native-ios-status-bar-padding";

import Login from "./../components/login";
import Timeline from "./../components/timeline";
import Centered from "./../components/centered";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <StatusBarPaddingIOS />
        <Centered>{user ? <Timeline /> : <Login />}</Centered>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    flex: 1
  }
});

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
