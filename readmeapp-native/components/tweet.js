import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking
} from "react-native";
import Hyperlink from "react-native-hyperlink";
const linkify = require("linkify-it")();
import Image from "react-native-scalable-image";
import styled from "styled-components";

import { ago } from "./../lib/helpers";

const { width } = Dimensions.get("window");

linkify.add("@", {
  validate: function(text, pos, self) {
    var tail = text.slice(pos);
    if (!self.re.twitter) {
      self.re.twitter = new RegExp(
        "^([a-zA-Z0-9_]){1,15}(?!_)(?=$|" + self.re.src_ZPCc + ")"
      );
    }
    if (self.re.twitter.test(tail)) {
      // Linkifier allows punctuation chars before prefix,
      // but we additionally disable `@` ("@@mention" is invalid)
      if (pos >= 2 && tail[pos - 2] === "@") {
        return false;
      }
      return tail.match(self.re.twitter)[0].length;
    }
    return 0;
  },
  normalize: function(match) {
    match.url = "https://twitter.com/" + match.url.replace(/^@/, "");
  }
});

const StyledAgoText = styled.Text`
  color: #2980b9;
`;

const StyledUserView = styled.View`
  margin-bottom: 10px;
  flex-grow: 1;
  flex-direction: row;
`;

const StyledUserNameText = styled.Text`
  margin: 0 5px;
  font-weight: bold;
`;

const StyledUserScreenNameText = styled.Text`
  margin-left: 5px;
  color: #a7a7a7;
`;

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
  _tweetLink() {
    const {
      id_str,
      user: { screen_name }
    } = this.props.tweet.item;
    return `https://twitter.com/${screen_name}/status/${id_str}`;
  }
  render() {
    const {
      tweet: { item }
    } = this.props;
    return (
      <View>
        <StyledUserView>
          <TouchableOpacity onPress={() => Linking.openURL(this._tweetLink())}>
            <StyledAgoText>{ago(item.created_at)} ago - </StyledAgoText>
          </TouchableOpacity>
          <StyledUserNameText>{item.user.name}</StyledUserNameText>
          <Text>•</Text>
          <StyledUserScreenNameText>
            {item.user.screen_name}
          </StyledUserScreenNameText>
        </StyledUserView>

        <Hyperlink
          linkify={linkify}
          linkDefault={true}
          linkStyle={{ color: "#2980b9" }}
        >
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
