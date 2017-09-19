import * as types from './mutation-types'
import api from './../lib/api'

export const requestToken = async ({ commit }) => {
  return new Promise(async r => {
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
    r()
  })
}

export const requestAccessToken = async ({ commit }, { oAuthToken, oAuthTokenSecret, oAuthVerifier} ) => {
  return new Promise(async r => {
    const { data : {
      oAuthAccessToken,
      oAuthAccessTokenSecret,
      user
    }} = await api.requestAccessToken(oAuthToken, oAuthTokenSecret, oAuthVerifier)
    commit(types.SET_OAUTH_ACCESS_TOKEN, {
      oAuthAccessToken
    })
    commit(types.SET_OAUTH_ACCESS_TOKEN_SECRET, {
      oAuthAccessTokenSecret
    })
    commit(types.SET_USER, {
      user
    })
    r()
  })
}
