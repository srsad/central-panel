export const state = () => ({
  error: null,
  messages: []
})

export const mutations = {
  SET_ERROR(state, error) {
    state.error = error
  },
  CLEAR_ERROR(state) {
    state.error = null
  },
  SOCKET_NEW_MESSAGE(state, message) {
    console.log('mutation', message)
    // state.messages.push(message)
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch('auth/autoLogin') // автологин
    await dispatch('settings/loadSettings') // загрузка общих настроек
  },
  SOCKET_NEW_MESSAGE(state, message) {
    console.log('action', message)
    // state.messages.push(message)
  }
}

export const getters = {
  error: (state) => state.error
}
