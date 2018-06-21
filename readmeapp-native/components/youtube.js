import React from "react";
import { WebView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const youtubeParser = url => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  }
  return;
};

export default ({ video: { expanded_url } }) => {
  const id = youtubeParser(expanded_url);
  if (!id) return null;
  const webView = (
    <WebView
      style={{ flex: 1, width: width - 40, height: 200, marginTop: 10 }}
      javaScriptEnabled={true}
      source={{
        uri: `https://www.youtube.com/embed/${id}?rel=0&autoplay=0&showinfo=0&controls=0`
      }}
    />
  );
  return webView;
};
