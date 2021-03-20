import axios from "axios";

const LoginURL = "/api/login";

export default {
  state: {
    authenticated: false,
    jwt: null,
  },
  getters: {
    authenticatedAxios(s) {
      return axios.create({ headers: { Authorization: `Bearer<${s.jwt}` } });
    },
  },
  mutations: {
    setAuthenticated(state, token) {
      state.jwt = token;
      state.authenticated = true;
    },
    clearAuthentication(state) {
      state.jwt = null;
      state.authenticated = false;
    },
  },
  actions: {
    async authenticate(context, credentials) {
        console.log(credentials)
      let response = await axios.post(LoginURL, credentials);
      if (response.data.success == true) {
        context.commit("setAuthenticated", response.data.token);
      }
    },
  },
};
