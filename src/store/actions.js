import * as types from './mutation-types'
import api from './../lib/api'

export const requestToken = async ({ commit }) => {
  try {
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
  } catch (error) {
    throw error
  } 
}

export const requestAccessToken = async ({ commit }, { oAuthToken, oAuthTokenSecret, oAuthVerifier} ) => {
  try {
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
  } catch (error) {
    throw error
  }
}

export const fetchTweets = async ({ commit, state }) => {
  try {
    commit(types.TWEETS_LOADING, {
      loading: true
    })
  
    const { oAuthAccessToken, oAuthAccessTokenSecret, user: { id }, tweets } = state

    const latestTweetId = tweets.length ? tweets[0].id : null

    const { data, errors } = await api.fetchTweets(
      oAuthAccessToken, oAuthAccessTokenSecret, id, latestTweetId
    )
  
    if (errors && Object.keys(errors).length) {
      throw errors
    }
  
    commit(types.TWEETS_LOADING, {
      loading: false
    })
    commit(types.SET_TWEETS, {
      tweets: data
    })
    commit(types.SET_LAST_FETCHED, {
      lastFetched: new Date()
    })
  } catch (error) {
    commit(types.TWEETS_LOADING, {
      loading: false
    })
    throw error
  }
}

export const logout = ({ commit, state }) => {
  
}
