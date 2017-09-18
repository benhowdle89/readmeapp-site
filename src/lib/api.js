import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000
})

export default {
  async requestToken () {
    const { data } = await instance.get('?type=oauth_request')
    return data
  }
}
