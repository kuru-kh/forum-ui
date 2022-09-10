import { createStore } from 'vuex'

export default createStore({
  state: {
    auth : {
      token : '',
      user : {}
    }
  },
  mutations: {
    login (state, data) {
      state.auth.token = data.token
      state.auth.user = data.user
      localStorage.setItem('auth', JSON.stringify(data));
    },
    logout(state) {
        state.auth = {
          token: '',
          user: {}
        };
        localStorage.removeItem('auth');
        alert('Logged out');
      },
      initialiseStore(state) {
        if (localStorage.getItem('auth')) {
          let auth = JSON.parse(localStorage.getItem('auth'))
          state.auth.token = auth.token
          state.auth.user = auth.user
        }
      }
  },
  actions: {
  },
  modules: {
  }
})
