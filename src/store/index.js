import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// initial state
const state = {
  user: null,
  oAuthToken: null,
  oAuthTokenSecret: null
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
