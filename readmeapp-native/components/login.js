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
  align-items: center;
  padding-horizontal: 20;
`;

const StyledLoginButton = styled.Button`
  color: #fff;
`;

const StyledDescText = styled.Text`
  font-family: RubikLight;
  font-size: 16;
  margin-bottom: 20;
  line-height: 25;
  color: #000;
`;

const StyledLogoText = styled.Text`
  color: #fff;
  font-family: RubikItalic;
  text-align: center;
  font-size: 40;
  font-style: italic;
  letter-spacing: 2px;
  margin-bottom: 30;
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
            [
              <StyledLogoText key="logo">Readme</StyledLogoText>,
              <StyledDescText key="desc">
                Readme is a purposefully feature-lite Twitter reader designed to
                show you the tweets you signed up to see.
              </StyledDescText>,
              <StyledLoginButton
                key="button"
                title="Login with Twitter"
                onPress={this._requestToken}
                color="#fff"
              />
            ]
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
