import React, { Component } from "react";
import { View, Button, Alert } from "react-native";
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
      }).catch(() => Alert.alert("Uh oh", "Couldn't login with Twitter"));
      if (!res.params)
        return Alert.alert("Uh oh", "Couldn't login with Twitter");
      const {
        params: { oauth_token, oauth_verifier }
      } = res;
      requestAccessToken(
        oauth_token,
        this.props.oAuthTokenSecret,
        oauth_verifier
      ).catch(() => Alert.alert("Uh oh", "Couldn't login with Twitter"));
    });
  };
  render() {
    const { tokenRequestLoading, accessTokenLoading } = this.props;
    return (
      <Centered>
        {tokenRequestLoading || accessTokenLoading ? (
          <Loader />
        ) : (
          <Button title="Login with Twitter" onPress={this._requestToken} />
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
