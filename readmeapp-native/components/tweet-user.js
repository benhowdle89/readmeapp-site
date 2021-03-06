import React from "react";
import { View, Dimensions } from "react-native";
import Image from "react-native-scalable-image";

const { width } = Dimensions.get("window");

const TweetUser = ({ user }) => {
  const profileImageURL = () => {
    const url = user.profile_image || user.profile_image_url_https || "";
    return url;
  };
  return (
    <View>
      <Image
        width={width * 0.075}
        style={{
          borderRadius: 8
        }}
        source={{
          uri: profileImageURL(),
          cache: "only-if-cached"
        }}
      />
    </View>
  );
};

export default TweetUser;
