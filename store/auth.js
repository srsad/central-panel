/**
 * Авторизация
 */

import jwtDecode from 'jwt-decode'
import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
  token: null, // токен
  refreshToken: null, // ? токен для замены
  access: [],
  fullname: '...',
  userData: null // данные авторизованного пользователя
})

export const actions = {
  async login({ commit }, formData) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { token, refreshToken, user } = await this.$axios.$post(
        '/api/v1/auth/login',
        formData
      )
      commit('SET_TOKEN', token)
      commit('SET_REFRESH_TOKEN', refreshToken)
      commit('SET_USER_DATA', user)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  setUser({ commit }, user) {
    commit('SET_USER_DATA', user)
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  async autoLogin({ commit, dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['cp-token']
    if (!token) return
    const jwt = jwtDecode(token)
    const user = await this.$axios.$get('/api/v1/user/get/' + jwt.userId)
    // eslint-disable-next-line prettier/prettier
    const rt = await this.$axios.$get('/api/v1/session/getfp/' + jwt.fingerprint)
    if (!rt[0]) {
      dispatch('logout')
      return
    }

    commit('SET_REFRESH_TOKEN', rt[0]._id)
    commit('SET_USER_DATA', user)
    if (isJWTValid(token)) {
      commit('SET_TOKEN', token)
    } else {
      dispatch('logout')
    }
  }
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    this.$axios.setToken(token, 'Bearer')
    Cookies.set('cp-token', token)
  },
  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken
  },
  SET_USER_DATA(state, userData) {
    state.userData = userData
    state.fullname = userData.fullname
    state.access = userData.role.access || []
  },
  LOGOUT(state) {
    state.refreshToken = null
    state.access = []
    state.userData = null

    state.token = null
    this.$axios.setToken(false)
    Cookies.remove('cp-token')
  }
}

export const getters = {
  user: (state) => state.userData,
  access: (state) => state.access,
  token: (state) => state.token,
  isAuthenticated: (state) => Boolean(state.token)
}

function isJWTValid(token) {
  if (!token) return false
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return new Date().getTime() / 1000 < expires
}
