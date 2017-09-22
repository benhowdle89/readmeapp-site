import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import initialState from './initial-state'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state: initialState,
  mutations,
  plugins: [createPersistedState({
    paths: [
      'user',
      'oAuthToken',
      'oAuthTokenSecret',
      'oAuthAccessToken',
      'oAuthAccessTokenSecret',
      'tweets',
      'lastFetched'
    ]
  })]
})
