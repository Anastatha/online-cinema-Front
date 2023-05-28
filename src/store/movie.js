export const movie = {
  namespaced: true,
  state: {
    movie: {},
    movieOne: {},
    genre: {},
    movieGenre: {},
    movieOpened: {},
  },
  getters: {
    getMovie(state) {
      return state.movie
    },

    getMovieOne(state) {
      return state.movieOne
    },

    getGenre(state) {
      return state.genre
    },

    getMovieGenre(state) {
      return state.movieGenre
    },

    getMovieOpened(state) {
      return state.movieOpened
    },
  },
  mutations: {
    SET_MOVIE(state, payload) {
      state.movie = payload
    },

    SET_MOVIE_ONE(state, movie) {
      state.movieOne = movie
    },

    SET_GENRE(state, payload) {
      state.genre = payload
    },

    SET_MOVIE_GENRE(state, payload) {
      state.movieGenre = payload
    },

    SET_MOVIE_OPENED(state, payload) {
      state.movieOpened = payload
    },
  },
  actions: {
    setMovie({commit}, payload) {
      commit('SET_MOVIE', payload)
    },

    setMovieOne({commit}, movie) {
      commit('SET_MOVIE_ONE', movie)
    },

    setGenre({commit}, payload) {
      commit('SET_GENRE', payload)
    },

    setMovieGenre({commit}, payload) {
      commit('SET_MOVIE_GENRE', payload)
    },

    setMovieOpened({commit}, payload) {
      commit('SET_MOVIE_OPENED', payload)
    },
  }
}