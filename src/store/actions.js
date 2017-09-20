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
    commit(types.SET_OAUTH_TOKEN, {
      oAuthToken: null
    })
    commit(types.SET_OAUTH_TOKEN_SECRET, {
      oAuthTokenSecret: null
    })
    r()
  })
}

export const fetchTweets = async ({ commit, state }) => {
  try {
    commit(types.TWEETS_LOADING, {
      loading: true
    })
    const { oAuthAccessToken, oAuthAccessTokenSecret, user: { id } } = state
    const { data } = await api.fetchTweets(oAuthAccessToken, oAuthAccessTokenSecret, id)
    commit(types.SET_TWEETS, {
      tweets: data
    })
    commit(types.SET_LAST_FETCHED, {
      lastFetched: new Date()
    })
    commit(types.TWEETS_LOADING, {
      loading: false
    }) 
  } catch (error) {
    const message = error.response ? error.response.data.errors : 'API Error'
    commit(types.FETCH_TWEET_ERROR, {
      fetchTweetError: message
    })
  }
}

export const logout = ({ commit, state }) => {
  
}

export const clearFetchTweetError = ({ commit }) => {
  commit(types.CLEAR_FETCH_TWEET_ERROR)
}
