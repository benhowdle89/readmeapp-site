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
import TweetUser from "./tweet-user";
import ExternalLink from "./external-link";
import YouTube from "./youtube";
import Video from "./video";

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
  margin-left: 10px;
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
  _youtubeURL() {
    const urls = this._urls();
    if (!urls) return;
    const yt = urls.find(u => /^youtu/i.test(u.display_url));
    return yt;
  }
  _videos() {
    const media = this._media();
    if (!media) return false;
    const videos = media.find(m => m.video_info);
    if (!videos) return false;
    const {
      video_info: { variants },
      media_url_https
    } = videos;
    const { url, content_type } = variants.find(v => v.url);

    return {
      image: media_url_https,
      source: url,
      type: content_type
    };
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
      tweet: { item },
      saveMeta
    } = this.props;
    return (
      <View>
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TweetUser user={item.user} />
            <StyledUserView>
              <TouchableOpacity
                onPress={() => Linking.openURL(this._tweetLink())}
              >
                <StyledAgoText>{ago(item.created_at)} ago - </StyledAgoText>
              </TouchableOpacity>
              <StyledUserNameText>{item.user.name}</StyledUserNameText>
              <Text>•</Text>
              <StyledUserScreenNameText>
                {item.user.screen_name}
              </StyledUserScreenNameText>
            </StyledUserView>
          </View>
          <Hyperlink
            linkify={linkify}
            linkDefault={true}
            linkStyle={{ color: "#2980b9" }}
            style={{
              marginTop: 10
            }}
          >
            <Text>{this._strippedTweet()}</Text>
          </Hyperlink>
        </View>
        {this._media() &&
          this._images().map(image => {
            return (
              <Image
                width={width - 40}
                style={{ marginTop: 10, borderRadius: 8 }}
                source={{ uri: this._imageUrl(image) }}
                key={image.media_url}
              />
            );
          })}
        {this._urls()[0] && (
          <ExternalLink
            url={this._urls()[0].expanded_url}
            id={item.id}
            meta={item.meta}
            saveMeta={saveMeta}
          />
        )}
        {this._youtubeURL() && <YouTube video={this._youtubeURL()} />}
        {this._videos() && <Video video={this._videos()} />}
      </View>
    );
  }
}
