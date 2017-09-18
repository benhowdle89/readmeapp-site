import * as types from './mutation-types'
import api from './../lib/api'

export const requestToken = async ({ commit }) => {
  const { data: {
    oAuthToken,
    oAuthTokenSecret
  } } = await api.requestToken()
  commit(types.SET_OAUTH_TOKEN, {
    oAuthToken
  })
  commit(types.SET_OAUTH_TOKEN_SECRET, {
    oAuthTokenSecret
  })
}
