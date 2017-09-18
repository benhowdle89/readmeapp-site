import * as types from './mutation-types'

export default {
  [types.LOGOUT] (state) {
    state.user = null
  },
  [types.SET_OAUTH_TOKEN] (state, { oAuthToken }) {
    state.oAuthToken = oAuthToken
  },
  [types.SET_OAUTH_TOKEN_SECRET] (state, { oAuthTokenSecret }) {
    state.oAuthTokenSecret = oAuthTokenSecret
  }
}
