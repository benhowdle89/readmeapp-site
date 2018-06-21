import "expo";
import React, { Component } from "react";
import { Text, View } from "react-native";

import { Provider } from "react-redux";

import configureStore from "./lib/store";

import Home from "./containers/home";

class App extends Component {
  state = {
    store: null
  };

  async componentWillMount() {
    const store = await configureStore();
    this.setState({ store });
  }

  render() {
    if (this.state.store === null) {
      return <Text>Booting...</Text>;
    }

    return (
      <Provider store={this.state.store}>
        <Home />
      </Provider>
    );
  }
}
export default App;
