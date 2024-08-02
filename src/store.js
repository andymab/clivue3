import { createStore } from 'vuex';
import Cookies from 'js-cookie';

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      Cookies.set('token', token);
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
    },
  },
  getters: {
    getToken: (state) => {
      if (!state.token) {
        const token = Cookies.get('token');
        if (token) {
          state.token = token;
        }
      }
      return state.token;
    },
  },
});