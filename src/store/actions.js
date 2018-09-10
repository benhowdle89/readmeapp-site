import * as types from "./mutation-types";
import api from "./../lib/api";

export const requestToken = async ({ commit }) => {
  try {
    commit(types.TOKEN_REQUEST_LOADING, {
      loading: true
    });
    const {
      data: { oAuthToken, oAuthTokenSecret }
    } = await api.requestToken();
    commit(types.SET_OAUTH_TOKEN, {
      oAuthToken
    });
    commit(types.SET_OAUTH_TOKEN_SECRET, {
      oAuthTokenSecret
    });
    commit(types.TOKEN_REQUEST_LOADING, {
      loading: false
    });
  } catch (error) {
    commit(types.TOKEN_REQUEST_LOADING, {
      loading: false
    });
    throw error;
  }
};

export const requestAccessToken = async (
  { commit },
  { oAuthToken, oAuthTokenSecret, oAuthVerifier }
) => {
  try {
    commit(types.ACCESS_TOKEN_LOADING, {
      loading: true
    });
    const {
      data: { oAuthAccessToken, oAuthAccessTokenSecret, user }
    } = await api.requestAccessToken(
      oAuthToken,
      oAuthTokenSecret,
      oAuthVerifier
    );
    commit(types.SET_OAUTH_ACCESS_TOKEN, {
      oAuthAccessToken
    });
    commit(types.SET_OAUTH_ACCESS_TOKEN_SECRET, {
      oAuthAccessTokenSecret
    });
    commit(types.SET_USER, {
      user
    });
    commit(types.SET_OAUTH_TOKEN, {
      oAuthToken: null
    });
    commit(types.SET_OAUTH_TOKEN_SECRET, {
      oAuthTokenSecret: null
    });
    commit(types.ACCESS_TOKEN_LOADING, {
      loading: false
    });
  } catch (error) {
    commit(types.ACCESS_TOKEN_LOADING, {
      loading: false
    });
    throw error;
  }
};

export const fetchLists = async ({ commit, state }) => {
  try {
    commit(types.LISTS_LOADING, {
      loading: true
    });
    const {
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      user: { id }
    } = state;
    const { data, errors } = await api.fetchLists(
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      id
    );

    if (errors && Object.keys(errors).length) {
      throw errors;
    }

    const { lists } = data;

    commit(types.LISTS_LOADING, {
      loading: false
    });
    commit(types.SET_LISTS, {
      lists: JSON.parse(lists)
    });
  } catch (error) {}
};

export const fetchTweets = async ({ commit, state }) => {
  try {
    commit(types.TWEETS_LOADING, {
      loading: true
    });

    const {
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      user: { id },
      tweets,
      currentListId
    } = state;

    const latestTweetId = tweets.length ? tweets[0].id : null;

    const { data, errors } = await api.fetchTweets(
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      id,
      latestTweetId,
      currentListId
    );

    if (errors && Object.keys(errors).length) {
      throw errors;
    }

    commit(types.TWEETS_LOADING, {
      loading: false
    });
    commit(types.SET_TWEETS, {
      tweets: data
    });
    commit(types.SET_LAST_FETCHED, {
      lastFetched: new Date()
    });
  } catch (error) {
    commit(types.TWEETS_LOADING, {
      loading: false
    });
    throw error;
  }
};

export const saveMeta = ({ commit, state }, { id, meta }) => {
  commit(types.SAVE_META, {
    id,
    meta
  });
};

export const setCurrentList = ({ commit, state, dispatch }, listId) => {
  const { currentListId } = state;
  commit(types.SET_CURRENT_LIST_ID, {
    listId
  });

  if (currentListId !== listId) {
    commit(types.SWITCH_TIMELINE);
    dispatch("fetchTweets");
  }
};

export const logout = ({ commit, state }) => {
  commit(types.LOGOUT);
};

export const switchTheme = ({ commit, state }) => {
  commit(types.SWITCH_THEME);
};
