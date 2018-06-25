import React, { Component } from "react";
import { Linking, TouchableOpacity, Text, Dimensions } from "react-native";
import Image from "react-native-scalable-image";
import styled from "styled-components";
import externalLinkFetcher from "./../lib/external-link";

const StyledLinkView = styled.TouchableOpacity`
  background: rgba(40, 41, 46, 0.03);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10;
`;

const StyledMetaView = styled.View`
  padding: 10px;
  flex: 1;
`;

const StyledTitleText = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledDescriptionText = styled.Text`
  font-style: italic;
  margin-bottom: 5px;
`;

const StyledLinkText = styled.Text`
  color: #7994e5;
`;

const { width } = Dimensions.get("window");

export default class ExternalLink extends Component {
  componentDidMount() {
    if (!this.props.meta) return this.fetchExternalLink();
  }
  async fetchExternalLink() {
    if (this.props.url.match(/youtube/)) return;
    const result = await externalLinkFetcher(this.props.url).catch(error =>
      console.log(error)
    );
    if (!result) return;
    if (!result.externalLink.title) return;

    this.props.saveMeta({
      id: this.props.id,
      meta: result
    });
  }
  render() {
    if (!this.props.meta) return null;
    const { externalLink } = this.props.meta;
    if (!externalLink.title) return null;
    if (externalLink.link.match(/youtube/)) return null;
    return (
      <StyledLinkView onPress={() => Linking.openURL(externalLink.link)}>
        {externalLink.image && (
          <Image
            source={{
              uri: externalLink.image
            }}
            width={width * 0.4}
          />
        )}
        <StyledMetaView>
          <StyledTitleText>{externalLink.title}</StyledTitleText>
          <StyledDescriptionText>
            {externalLink.description}
          </StyledDescriptionText>
          <StyledLinkText>{externalLink.site}</StyledLinkText>
        </StyledMetaView>
      </StyledLinkView>
    );
  }
}
