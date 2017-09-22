import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  user: null,
  oAuthToken: null,
  oAuthTokenSecret: null,
  oAuthAccessToken: null,
  oAuthAccessTokenSecret: null,
  tweets: [],
  tweetsLoading: false,
  lastFetched: null
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugins: [createPersistedState()]
})
