import Vue from 'vue'
import Vuex from 'vuex'
import boards from './boards'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    boards
  }
})
