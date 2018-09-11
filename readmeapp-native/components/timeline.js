import React, { Component } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { connect } from "react-redux";
import { AuthSession } from "expo";
import styled from "styled-components";

import { fetchTweets, logout, saveMeta, resetLoading } from "./../lib/reducer";

import Tweet from "./../components/tweet";
import UserBar from "./../components/user-bar";
import Centered from "./../components/centered";

class Timeline extends Component {
  componentWillMount() {
    this._fetchTweets();
  }
  _fetchTweets() {
    const {
      user,
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      fetchTweets,
      tweets,
      resetLoading,
      currentListId
    } = this.props;
    fetchTweets(
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      user.id,
      currentListId
    ).catch(error => {
      resetLoading();
      Alert.alert(
        "Uh oh",
        "Couldn't fetch tweets. If the error persists, try signing out and back in again."
      );
    });
  }
  render() {
    const { tweets, user, logout, tweetsLoading, saveMeta } = this.props;
    return (
      <View style={{ flex: 1, marginBottom: 20, paddingTop: 60 }}>
        <Centered>
          <FlatList
            refreshing={tweetsLoading}
            onRefresh={() => this._fetchTweets()}
            data={tweets}
            initialNumToRender={10}
            renderItem={tweet => {
              return <Tweet tweet={tweet} saveMeta={saveMeta} />;
            }}
            removeClippedSubviews={true}
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
        <UserBar user={user} logout={logout} loading={tweetsLoading} />
      </View>
    );
  }
}

const mapStateToProps = ({
  user,
  oAuthAccessToken,
  oAuthAccessTokenSecret,
  tweets,
  tweetsLoading,
  currentListId
}) => {
  return {
    user,
    oAuthAccessToken,
    oAuthAccessTokenSecret,
    tweets,
    tweetsLoading,
    currentListId
  };
};

const mapDispatchToProps = {
  fetchTweets,
  logout,
  saveMeta,
  resetLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
