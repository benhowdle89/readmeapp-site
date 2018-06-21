import React from "react";
import { View, Dimensions } from "react-native";
import Image from "react-native-scalable-image";

const { width } = Dimensions.get("window");

export default ({ user }) => {
  const profileImageURL = () => {
    const url = user.profile_image || user.profile_image_url_https || "";
    return url.replace(/_normal/, "");
  };
  return (
    <View>
      <Image
        width={width * 0.075}
        style={{
          borderRadius: 8
        }}
        source={{
          uri: profileImageURL()
        }}
      />
    </View>
  );
};
