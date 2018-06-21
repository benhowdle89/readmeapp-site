import React, { Component } from "react";
import { View, Button, Alert, Dimensions } from "react-native";
import { connect } from "react-redux";
import { AuthSession } from "expo";
import styled from "styled-components";

import {
  requestToken,
  requestAccessToken,
  twitterOAuthURL
} from "./../lib/reducer";

import Centered from "./centered";
import Loader from "./loader";

const { width } = Dimensions.get("window");

const standardAlert = () => Alert.alert("Uh oh", "Couldn't login with Twitter");

const StyledHeroView = styled.View`
  background-color: #7994e5;
  flex: 1;
  border: 22px solid #313036;
  width: ${width};
  margin-left: -20px;
`;

const StyledLoginButton = styled.Button`
  color: #fff;
`;

class Login extends Component {
  _requestToken = async () => {
    const { requestToken, requestAccessToken } = this.props;
    requestToken().then(async () => {
      if (!this.props.oAuthToken) return standardAlert();
      let res = await AuthSession.startAsync({
        authUrl: twitterOAuthURL(this.props.oAuthToken)
      }).catch(standardAlert);
      if (!res.params) return standardAlert();
      const {
        params: { oauth_token, oauth_verifier }
      } = res;
      requestAccessToken(
        oauth_token,
        this.props.oAuthTokenSecret,
        oauth_verifier
      ).catch(standardAlert);
    });
  };
  render() {
    const { tokenRequestLoading, accessTokenLoading } = this.props;
    return (
      <StyledHeroView>
        <Centered>
          {tokenRequestLoading || accessTokenLoading ? (
            <Loader />
          ) : (
            <StyledLoginButton
              title="Login with Twitter"
              onPress={this._requestToken}
              color="#fff"
            />
          )}
        </Centered>
      </StyledHeroView>
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
