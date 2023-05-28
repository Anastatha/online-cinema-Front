import { createStore } from 'vuex'
import {user} from './user'
import {movie} from './movie'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: user,
    movie: movie
  }
})
