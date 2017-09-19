import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000
})

export default {
  async requestToken () {
    const { data } = await instance.get('?type=oauth_request')
    return data
  },
  async requestAccessToken (token, tokenSecret, verifier) {
    const { data } = await instance.post('?type=auth_token', {
      token, tokenSecret, verifier
    })
    return data
  },
  async fetchTweets (accessToken, accessTokenSecret) {
    const { data } = await instance.get('?type=tweets')
    return data
  }
}
