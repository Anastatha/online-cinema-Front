export const user = {
  namespaced: true,
  state: {
    user: {},
    isAuth: false
  },
  getters: {
    getUser(state) {
      return state.user
    },
    getAuth(state) {
        return state.isAuth
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_AUTH(state, payload) {
      state.isAuth = payload
    }
  },
  actions: {
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    setAuth({commit}, payload) {
        commit('SET_AUTH', payload)
    },
  }
}

// export const user = {
//     state: {
//         user: {},
//         isAuth: false
//     },
//     getters: {
//         ISROLE(state) {
//             return state.isRole
//         },
//         USER(state) {
//             return state.user
//         },
//         ISAUTH(state) {
//             return state.isAuth
//         }
//     },
//     mutations: {
//         setUser(state, user) {
//             state.user = user
//         },
//     },
//     actions: {
//         async registration({commit}, data) {
//             axios.post(`http://localhost:3000/api/user/registration`, {
//                 'email': data.email,
//                 'password': data.password,
//                 'role': "ADMIN"
//             }).then(response => {
//                 console.log(response.data.token)
//                 localStorage.setItem('token', response.data.token)
//                 const jwtData = jwt_decode(response.data.token)
//                 commit('setUser', {jwtData})
//             })
//         },
//         async login({commit}, data) {
//             axios.post(`http://localhost:3000/api/user/login`, {
//                 'email': data.email,
//                 'password': data.password
//             }). then(response => {
//                 console.log(response.data.token)
//                 localStorage.setItem('token', response.data.token)
//                 const jwtData = jwt_decode(response.data.token)
//                 commit('setUser', response.data)
//             })
//         }
//     },
//     namespaced: true
// }