export const state = () => ({
  logged: false,
  token: '',
  slug_topico: "",
  topicos: [],
  posts: [],
  api_path: "http://localhost:5000"
});

export const mutations = {
  toLogin(state, value) {
    state.logged = value;
  },
  setTopicos(state, value) {
    state.topicos = value;
  },
  setPosts(state, value) {
    state.posts = value;
  },
  setSlugTopico(state, value) {
    state.slug_topico = value;
  },
  setToken(state, value) {
    state.token = value;
  }
}

export const getters = {
  isLogged(state) {
    return state.logged;
  },
  getApiPath(state) {
    return state.api_path;
  },
  getTopicos(state) {
    return state.topicos;
  },
  getPosts(state) {
    return state.posts;
  },
  getSlugTopico(state) {
    return state.slug_topico;
  },
  getToken(state) {
    return state.token;
  }
}

