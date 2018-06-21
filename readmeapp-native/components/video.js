import React from "react";
import { Dimensions } from "react-native";
import { Video } from "expo";

const { width } = Dimensions.get("window");

export default ({ video: { source } }) => {
  return (
    <Video
      style={{ flex: 1, width: width - 40, height: 200, marginTop: 10 }}
      useNativeControls
      isLooping
      isMuted={true}
      source={{
        uri: source
      }}
    />
  );
};
