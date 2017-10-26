import uniq from 'lodash.uniqby'
import * as types from './mutation-types'
import initialState from './initial-state'

const TWEETS_TO_STORE = 100

export default {
  [types.LOGOUT] (state) {
    Object.keys(state).map(stateKey => {
      state[stateKey] = initialState[stateKey]
    })
  },
  [types.SWITCH_THEME] (state) {
    state.theme = state.theme == 'light' ? 'dark' : 'light'
  },
  [types.SET_OAUTH_TOKEN] (state, { oAuthToken }) {
    state.oAuthToken = oAuthToken
  },
  [types.SET_OAUTH_TOKEN_SECRET] (state, { oAuthTokenSecret }) {
    state.oAuthTokenSecret = oAuthTokenSecret
  },
  [types.SET_OAUTH_ACCESS_TOKEN] (state, { oAuthAccessToken }) {
    state.oAuthAccessToken = oAuthAccessToken
  },
  [types.SET_OAUTH_ACCESS_TOKEN_SECRET] (state, { oAuthAccessTokenSecret }) {
    state.oAuthAccessTokenSecret = oAuthAccessTokenSecret
  },
  [types.SET_USER] (state, { user }) {
    state.user = user
  },
  [types.SET_TWEETS] (state, { tweets }) {
    state.tweets = uniq([
      ...tweets,
      ...state.tweets
    ].slice(0, TWEETS_TO_STORE), 'id')
  },
  [types.TWEETS_LOADING] (state, { loading }) {
    state.tweetsLoading = loading
  },
  [types.TOKEN_REQUEST_LOADING] (state, { loading }) {
    state.tokenRequestLoading = loading
  },
  [types.ACCESS_TOKEN_LOADING] (state, { loading }) {
    state.accessTokenLoading = loading
  },
  [types.SET_LAST_FETCHED] (state, { lastFetched }) {
    state.lastFetched = lastFetched
  }
}
