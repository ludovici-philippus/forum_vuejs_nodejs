export const state = () => ({
  logged: false,
  api_path: "http://localhost:5000"
});

export const mutations = {
  toLogin(state, value) {
    state.logged = value;
  },
}

export const getters = {
  isLogged(state) {
    return state.logged;
  },
  getApiPath(state) {
    return state.api_path;
  }
}
