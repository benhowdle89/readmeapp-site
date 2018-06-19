import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import Hyperlink from "react-native-hyperlink";
import Image from "react-native-scalable-image";

const { width } = Dimensions.get("window");

export default class Tweet extends Component {
  _media() {
    const {
      tweet: { item }
    } = this.props;
    return item.extended_entities && item.extended_entities.media;
  }
  _urls() {
    const {
      tweet: { item }
    } = this.props;
    return item.entities && item.entities.urls;
  }
  _images() {
    const {
      tweet: { item }
    } = this.props;
    return (
      this._media() &&
      item.extended_entities.media.filter(m => m.type !== "animated_gif")
    );
  }
  _imageUrl({ media_url }) {
    return `${media_url.replace(/^http:\/\//i, "https://")}:small`;
  }
  _strippedTweet() {
    const {
      tweet: { item }
    } = this.props;
    let text = item.text;
    const media = this._media();
    media &&
      media.forEach(m => {
        const [start, end] = m.indices;
        text = text.slice(0, start);
      });
    const urls = this._urls();
    if (!urls) return text;
    urls.forEach(urlObj => {
      const { expanded_url, url } = urlObj;
      const re = new RegExp(url);
      text = text.replace(re, expanded_url);
    });
    return text;
  }
  render() {
    const {
      tweet: { item }
    } = this.props;
    return (
      <View>
        <View
          style={{
            marginBottom: 10,
            flex: 1,
            flexDirection: "row"
          }}
        >
          <Text style={{ marginRight: 5, fontWeight: "bold" }}>
            {item.user.name}
          </Text>
          <Text>•</Text>
          <Text style={{ marginLeft: 5, color: "#a7a7a7" }}>
            {item.user.screen_name}
          </Text>
        </View>

        <Hyperlink linkDefault={true} linkStyle={{ color: "#2980b9" }}>
          <Text>{this._strippedTweet()}</Text>
        </Hyperlink>
        {this._media() &&
          this._images().map(image => {
            return (
              <Image
                width={width - 40}
                style={{ marginTop: 10 }}
                source={{ uri: this._imageUrl(image) }}
                key={image.media_url}
              />
            );
          })}
      </View>
    );
  }
}
