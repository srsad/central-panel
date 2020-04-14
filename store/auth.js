/**
 * Авторизация
 */

import jwtDecode from 'jwt-decode'
// import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
  token: null,
  userId: null,
  sessionId: null
})

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      const user = await this.$axios.$post('/api/v1/auth/login', formData)
      console.log(user)
      // dispatch('setToken', user.token)
      // dispatch('setUserId', user.userId)
      // dispatch('setUserRole', user.role)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    this.$axios.setToken(token, 'Bearer')
    Cookies.set('jwt-token', token)
  },
  CLEAR_TOKEN(state) {
    state.token = null
    this.$axios.setToken(false)
    Cookies.remove('jwt-token')
  }
}

export const getters = {
  isAuthenticated: (state) => ~~state.token
}

// eslint-disable-next-line no-unused-vars
function isJWTValid(token) {
  if (!token) return false
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return new Date().getTime() / 1000 < expires
}
