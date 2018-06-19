import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { AuthSession } from "expo";

import { fetchTweets } from "./../lib/reducer";

import Tweet from "./../components/tweet";
import UserBar from "./../components/user-bar";

class Timeline extends Component {
  componentWillMount() {
    const {
      user,
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      fetchTweets
    } = this.props;
    fetchTweets(oAuthAccessToken, oAuthAccessTokenSecret, user.id);
  }
  render() {
    const { tweets, user } = this.props;
    return (
      <View>
        <UserBar user={user} />
        <FlatList
          data={tweets}
          renderItem={tweet => {
            return <Tweet tweet={tweet} />;
          }}
          style={{
            marginVertical: 20
          }}
          keyExtractor={tweet => tweet.id_str}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: "#eaeaea",
                marginVertical: 20
              }}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({
  user,
  oAuthAccessToken,
  oAuthAccessTokenSecret,
  tweets
}) => {
  return {
    user,
    oAuthAccessToken,
    oAuthAccessTokenSecret,
    tweets
  };
};

const mapDispatchToProps = {
  fetchTweets
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
