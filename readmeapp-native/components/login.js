import React, { Component } from "react";
import { View, Button } from "react-native";
import { connect } from "react-redux";
import { AuthSession } from "expo";

import {
  requestToken,
  requestAccessToken,
  twitterOAuthURL
} from "./../lib/reducer";

class Login extends Component {
  _requestToken = async () => {
    const { requestToken, requestAccessToken } = this.props;
    requestToken().then(async () => {
      let res = await AuthSession.startAsync({
        authUrl: twitterOAuthURL(this.props.oAuthToken)
      });
      const {
        params: { oauth_token, oauth_verifier }
      } = res;
      console.log(this.props);
      await requestAccessToken(
        oauth_token,
        this.props.oAuthTokenSecret,
        oauth_verifier
      );
    });
  };
  render() {
    return (
      <View>
        <Button title="Login" onPress={this._requestToken} />
      </View>
    );
  }
}

const mapStateToProps = ({ user, oAuthToken, oAuthTokenSecret }) => {
  return {
    user,
    oAuthToken,
    oAuthTokenSecret
  };
};

const mapDispatchToProps = {
  requestToken,
  requestAccessToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
