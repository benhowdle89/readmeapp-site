import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30000
})

export default {
  async requestToken () {
    const { data: { data }, errors } = await instance.get('?type=oauth_request')
    return {
      data, errors
    }
  },
  async requestAccessToken (token, tokenSecret, verifier) {
    const { data: { data }, errors } = await instance.post('?type=auth_token', {
      token, tokenSecret, verifier
    })
    return {
      data, errors
    }
  },
  async fetchTweets (accessToken, accessTokenSecret, userId, latestId) {
    const { data: { data }, errors } = await instance.post('?type=tweets', {
      accessToken,
      accessTokenSecret,
      userId,
      latestId
    })
    return {
      data, errors
    }
  }
}
