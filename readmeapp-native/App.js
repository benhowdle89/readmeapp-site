import "expo";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { Font } from "expo";
import { Provider } from "react-redux";

import configureStore from "./lib/store";

import Home from "./containers/home";

class App extends Component {
  state = {
    store: null
  };

  async componentWillMount() {
    await Font.loadAsync({
      Neuton: require("./assets/fonts/Neuton/Neuton-Light.ttf"),
      Rubik: require("./assets/fonts/Rubik/Rubik-Regular.ttf"),
      RubikBold: require("./assets/fonts/Rubik/Rubik-Medium.ttf"),
      RubikItalic: require("./assets/fonts/Rubik/Rubik-Italic.ttf"),
      RubikLight: require("./assets/fonts/Rubik/Rubik-Light.ttf")
    });

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
