import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import styled from "styled-components";

import Loader from "./loader";

const StyledBarView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: rgba(121, 148, 229, 0.23);
  border-bottom-width: 1;
  padding: 20px 0;
`;

const StyledLinkText = styled.Text`
  color: #2980b9;
  font-family: Rubik;
`;

const StyledLogoText = styled.Text`
  color: #7994e5;
  font-style: italic;
  letter-spacing: 2px;
  font-family: RubikItalic;
  font-size: 20;
`;

export default class UserBar extends Component {
  _handleSignOut = () => {
    this.props.logout();
  };
  render() {
    const { user, loading } = this.props;
    return (
      <StyledBarView>
        {loading ? <Loader /> : <StyledLogoText>Readme</StyledLogoText>}
        <TouchableOpacity onPress={this._handleSignOut}>
          <StyledLinkText>Sign Out</StyledLinkText>
        </TouchableOpacity>
      </StyledBarView>
    );
  }
}
