import React, { Component } from "react";
import { View, Alert, Dimensions } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";

import Loader from "./loader";

import {
  fetchLists,
  switchTimeline,
  fetchTweets,
  resetLoading,
  setCurrentList
} from "./../lib/reducer";

const ListsButton = styled.TouchableOpacity``;
const ListButton = styled.TouchableOpacity`
  border-bottom-color: ${props => (props.current ? "#2980b9" : "#fff")};
  border-bottom-width: 1px;
  padding: 6px 0;
  margin-bottom: 10px;
`;
const StyledLinkText = styled.Text`
  color: ${props => (props.secondary ? "#555" : "#2980b9")};
  font-family: Rubik;
`;
const ListItems = styled.View`
  background: #fff;
  margin-top: 25px;
  position: absolute;
  width: 200px;
  right: 0;
  padding: 12px;
  border: 1px #2980b9;
`;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }
  componentWillMount() {
    if (!this.props.lists.length) this._fetchLists();
  }
  _fetchLists = () => {
    const {
      user,
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      fetchLists,
      resetLoading
    } = this.props;
    fetchLists(oAuthAccessToken, oAuthAccessTokenSecret, user.id).catch(
      error => {
        console.log(error);
        resetLoading();
        Alert.alert(
          "Uh oh",
          "Couldn't fetch lists. If the error persists, try signing out and back in again."
        );
      }
    );
  };
  _handleExpand = () => {
    return this.setState({
      expanded: !this.state.expanded
    });
  };
  _handleSetCurrentList = listId => {
    const {
      switchTimeline,
      fetchTweets,
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      user,
      currentListId
    } = this.props;
    this.props.setCurrentList(listId);
    this.setState({
      expanded: false
    });
    if (currentListId !== listId) {
      switchTimeline();
      fetchTweets(
        oAuthAccessToken,
        oAuthAccessTokenSecret,
        user.id,
        listId
      ).catch(error => {
        console.log(error);
        resetLoading();
        Alert.alert(
          "Uh oh",
          "Couldn't fetch tweets. If the error persists, try signing out and back in again."
        );
      });
    }
  };
  getLists(lists) {
    const { currentListId } = this.props;
    return lists.map(list => {
      return (
        <ListButton
          key={list.id}
          current={list.id_str === currentListId}
          onPress={() => this._handleSetCurrentList(list.id_str)}
        >
          <StyledLinkText current={list.id_str === currentListId}>
            {list.name}
          </StyledLinkText>
        </ListButton>
      );
    });
  }
  render() {
    const { lists, listsLoading, currentListId } = this.props;

    return (
      <View>
        <ListsButton onPress={this._handleExpand}>
          <StyledLinkText>Lists</StyledLinkText>
        </ListsButton>
        {!!this.state.expanded && (
          <ListItems
            style={{
              zIndex: 1000
            }}
          >
            <ListButton
              current={currentListId === null}
              onPress={() => this._handleSetCurrentList(null)}
            >
              <StyledLinkText current={null === currentListId}>
                Home timeline
              </StyledLinkText>
            </ListButton>
            {this.getLists(lists)}
            <ListButton
              style={{
                marginTop: 15
              }}
              onPress={this._fetchLists}
            >
              {listsLoading ? (
                <Loader />
              ) : (
                <StyledLinkText secondary>Refresh lists?</StyledLinkText>
              )}
            </ListButton>
          </ListItems>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({
  user,
  oAuthAccessToken,
  oAuthAccessTokenSecret,
  lists,
  listsLoading,
  currentListId
}) => {
  return {
    user,
    oAuthAccessToken,
    oAuthAccessTokenSecret,
    lists,
    listsLoading,
    currentListId
  };
};

const mapDispatchToProps = {
  fetchLists,
  resetLoading,
  setCurrentList,
  switchTimeline,
  fetchTweets
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
