import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import styled from "styled-components";

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
`;

const StyledLogoText = styled.Text`
  color: #7994e5;
`;

export default class UserBar extends Component {
  _handleSignOut = () => {
    this.props.logout();
  };
  render() {
    const { user } = this.props;
    return (
      <StyledBarView>
        <StyledLogoText>Readme</StyledLogoText>
        <Text>{user.name}</Text>
        <TouchableOpacity onPress={this._handleSignOut}>
          <StyledLinkText>Sign Out</StyledLinkText>
        </TouchableOpacity>
      </StyledBarView>
    );
  }
}
