/**
 * Авторизация
 */

import jwtDecode from 'jwt-decode'
import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
  token: null
})

export const actions = {
  async login({ commit }, formData) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { token, refreshToken } = await this.$axios.$post(
        '/api/v1/auth/login',
        formData
      )
      commit('SET_TOKEN', token)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  logout({ commit }) {
    commit('CLEAR_TOKEN')
  },
  autoLogin({ commit, dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['cp-token']

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
  CLEAR_TOKEN(state) {
    state.token = null
    this.$axios.setToken(false)
    Cookies.remove('cp-token')
  }
}

export const getters = {
  token: (state) => state.token,
  isAuthenticated: (state) => Boolean(state.token)
}

function isJWTValid(token) {
  if (!token) return false
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return new Date().getTime() / 1000 < expires
}
