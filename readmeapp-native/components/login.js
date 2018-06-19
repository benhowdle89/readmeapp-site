import React, { Component } from "react";
import { View, Button } from "react-native";
import { connect } from "react-redux";
import { AuthSession } from "expo";

import {
  requestToken,
  requestAccessToken,
  twitterOAuthURL
} from "./../lib/reducer";

import Centered from "./centered";
import Loader from "./loader";

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
      await requestAccessToken(
        oauth_token,
        this.props.oAuthTokenSecret,
        oauth_verifier
      );
    });
  };
  render() {
    const { tokenRequestLoading, accessTokenLoading } = this.props;
    return (
      <Centered>
        {tokenRequestLoading || accessTokenLoading ? (
          <Loader />
        ) : (
          <Button title="Login" onPress={this._requestToken} />
        )}
      </Centered>
    );
  }
}

const mapStateToProps = ({
  user,
  oAuthToken,
  oAuthTokenSecret,
  tokenRequestLoading,
  accessTokenLoading
}) => {
  return {
    user,
    oAuthToken,
    oAuthTokenSecret,
    tokenRequestLoading,
    accessTokenLoading
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
