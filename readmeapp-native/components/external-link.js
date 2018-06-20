import React, { Component } from "react";
import { Linking, TouchableOpacity, Text } from "react-native";
import externalLinkFetcher from "./../lib/external-link";
import Image from "react-native-scalable-image";

export default class ExternalLink extends Component {
  componentDidMount() {
    if (!this.props.meta) return this.fetchExternalLink();
  }
  async fetchExternalLink() {
    const result = await externalLinkFetcher(this.props.url).catch(error =>
      console.log(error)
    );
    if (!result) return;
    this.props.saveMeta({
      id: this.props.id,
      meta: result
    });
  }
  render() {
    if (!this.props.meta) return null;
    const { externalLink } = this.props.meta;
    return (
      <TouchableOpacity onPress={() => Linking.openURL(externalLink.link)}>
        {externalLink.image && (
          <Image
            source={{
              uri: externalLink.image
            }}
          />
        )}
        <Text>{externalLink.title}</Text>
        <Text>{externalLink.description}</Text>
        <Text>{externalLink.site}</Text>
      </TouchableOpacity>
    );
  }
}
