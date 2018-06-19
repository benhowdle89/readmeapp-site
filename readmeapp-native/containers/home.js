import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import StatusBarPaddingIOS from "react-native-ios-status-bar-padding";

import Login from "./../components/login";
import Timeline from "./../components/timeline";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <StatusBarPaddingIOS />
        <View>{user ? <Timeline /> : <Login />}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
