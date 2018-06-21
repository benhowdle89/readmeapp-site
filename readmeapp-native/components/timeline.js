import React, { Component } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { connect } from "react-redux";
import { AuthSession } from "expo";
import styled from "styled-components";

import { fetchTweets, logout, saveMeta } from "./../lib/reducer";

import Tweet from "./../components/tweet";
import UserBar from "./../components/user-bar";
import Centered from "./../components/centered";

class Timeline extends Component {
  componentWillMount() {
    const {
      user,
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      fetchTweets,
      tweets
    } = this.props;
    fetchTweets(oAuthAccessToken, oAuthAccessTokenSecret, user.id).catch(
      error => Alert.alert("Uh oh", "Couldn't fetch tweets")
    );
  }
  render() {
    const { tweets, user, logout, tweetsLoading, saveMeta } = this.props;
    return (
      <View style={{ flex: 1, paddingBottom: 60 }}>
        <UserBar user={user} logout={logout} loading={tweetsLoading} />
        <Centered>
          <FlatList
            data={tweets}
            renderItem={tweet => {
              return <Tweet tweet={tweet} saveMeta={saveMeta} />;
            }}
            style={{
              marginTop: 20
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
        </Centered>
      </View>
    );
  }
}

const mapStateToProps = ({
  user,
  oAuthAccessToken,
  oAuthAccessTokenSecret,
  tweets,
  tweetsLoading
}) => {
  return {
    user,
    oAuthAccessToken,
    oAuthAccessTokenSecret,
    tweets,
    tweetsLoading
  };
};

const mapDispatchToProps = {
  fetchTweets,
  logout,
  saveMeta
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
