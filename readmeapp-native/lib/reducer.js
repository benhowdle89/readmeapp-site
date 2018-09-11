import uniq from "lodash.uniqby";

const TWITTER_BASE_URL = "https://twitter.com/";

export const twitterOAuthURL = token =>
  `${TWITTER_BASE_URL}oauth/authenticate?oauth_token=${token}`;

export const initialState = {
  user: null,
  oAuthToken: null,
  oAuthTokenSecret: null,
  oAuthAccessToken: null,
  oAuthAccessTokenSecret: null,
  tweets: [],
  tweetsLoading: false,
  tokenRequestLoading: false,
  accessTokenLoading: false,
  lastFetched: null,
  theme: "light",
  lists: [],
  listsLoading: false,
  currentListId: null
};

const TWEETS_TO_STORE = 50;

export const TOKEN = "TOKEN";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAIL = "TOKEN_FAIL";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const ACCESS_TOKEN_SUCCESS = "ACCESS_TOKEN_SUCCESS";
export const ACCESS_TOKEN_FAIL = "ACCESS_TOKEN_FAIL";
export const FETCH_TWEETS = "FETCH_TWEETS";
export const FETCH_TWEETS_SUCCESS = "FETCH_TWEETS_SUCCESS";
export const FETCH_TWEETS_FAIL = "FETCH_TWEETS_FAIL";
export const FETCH_LISTS = "FETCH_LISTS";
export const FETCH_LISTS_SUCCESS = "FETCH_LISTS_SUCCESS";
export const FETCH_LISTS_FAIL = "FETCH_LISTS_FAIL";
export const SET_LAST_FETCHED = "SET_LAST_FETCHED";
export const LOGOUT = "LOGOUT";
export const SWITCH_THEME = "SWITCH_THEME";
export const SAVE_META = "SAVE_META";
export const RESET_LOADING = "RESET_LOADING";
export const SET_CURRENT_LIST_ID = "SET_CURRENT_LIST_ID";
export const SWITCH_TIMELINE = "SWITCH_TIMELINE";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return initialState;
    case SWITCH_THEME:
      return { ...state, theme: theme === "light" ? "dark" : "light" };
    case FETCH_LISTS:
      return {
        ...state,
        listsLoading: true
      };
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        listsLoading: false,
        lists: JSON.parse(action.payload.data.data.lists)
      };
    case FETCH_LISTS_FAIL:
      return {
        ...state,
        listsLoading: false,
        error: "Error while fetching lists"
      };
    case FETCH_TWEETS:
      return {
        ...state,
        tweetsLoading: true
      };
    case FETCH_TWEETS_SUCCESS:
      const tweetsData = action.payload.data.data;
      return {
        ...state,
        tweetsLoading: false,
        tweets: uniq(
          [...tweetsData, ...state.tweets].slice(0, TWEETS_TO_STORE),
          "id"
        )
      };
    case FETCH_TWEETS_FAIL:
      return {
        ...state,
        tweetsLoading: false,
        error: "Error while fetching tweets"
      };
    case SAVE_META:
      return {
        ...state,
        tweets: [
          ...state.tweets.map(tweet => {
            if (tweet.id !== action.id) return tweet;
            return {
              ...tweet,
              meta: action.meta
            };
          })
        ]
      };
    case SWITCH_TIMELINE:
      return {
        ...state,
        tweets: [],
        lastFetched: null
      };
    case SET_CURRENT_LIST_ID:
      return {
        ...state,
        currentListId: action.listId
      };
    case TOKEN:
      return {
        ...state,
        tokenRequestLoading: true
      };
    case TOKEN_SUCCESS:
      const tokenData = action.payload.data.data;
      return {
        ...state,
        oAuthToken: tokenData.oAuthToken,
        oAuthTokenSecret: tokenData.oAuthTokenSecret,
        tokenRequestLoading: false
      };
    case TOKEN_FAIL:
      return {
        ...state,
        tokenRequestLoading: false,
        error: "Error fetching token"
      };
    case ACCESS_TOKEN:
      return {
        ...state,
        accessTokenLoading: true
      };
    case ACCESS_TOKEN_SUCCESS:
      const accessTokenData = action.payload.data.data;
      return {
        ...state,
        oAuthAccessToken: accessTokenData.oAuthAccessToken,
        oAuthAccessTokenSecret: accessTokenData.oAuthAccessTokenSecret,
        user: accessTokenData.user,
        accessTokenLoading: false
      };
    case ACCESS_TOKEN_FAIL:
      return {
        ...state,
        accessTokenLoading: false,
        error: "Error fetching token"
      };
    case SET_LAST_FETCHED:
      return {
        ...state,
        lastFetched: action.lastFetched
      };
    case RESET_LOADING:
      return {
        ...state,
        tweetsLoading: false,
        accessTokenLoading: false,
        tokenRequestLoading: false,
        listsLoading: false
      };
    default:
      return state;
  }
}

export function resetLoading() {
  return {
    type: RESET_LOADING
  };
}

export function saveMeta({ id, meta }) {
  return {
    type: SAVE_META,
    id,
    meta
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function requestToken() {
  return {
    type: TOKEN,
    payload: {
      request: {
        url: "?type=oauth_request"
      }
    }
  };
}

export function requestAccessToken(token, tokenSecret, verifier) {
  return {
    type: ACCESS_TOKEN,
    payload: {
      request: {
        url: "?type=auth_token",
        method: "POST",
        data: {
          token,
          tokenSecret,
          verifier
        }
      }
    }
  };
}

export function setCurrentList(listId) {
  return {
    type: SET_CURRENT_LIST_ID,
    listId
  };
}

export function switchTimeline() {
  return {
    type: SWITCH_TIMELINE
  };
}

export function fetchLists(accessToken, accessTokenSecret, userId) {
  return {
    type: FETCH_LISTS,
    payload: {
      request: {
        url: "?type=lists",
        method: "POST",
        data: {
          accessToken,
          accessTokenSecret,
          userId
        }
      }
    }
  };
}

export function fetchTweets(
  accessToken,
  accessTokenSecret,
  userId,
  currentListId
) {
  return {
    type: FETCH_TWEETS,
    payload: {
      request: {
        url: "?type=tweets",
        method: "POST",
        data: {
          accessToken,
          accessTokenSecret,
          userId,
          currentListId
        }
      }
    }
  };
}
