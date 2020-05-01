export const state = () => ({
  error: null
})

export const mutations = {
  SET_ERROR(state, error) {
    state.error = error
  },
  CLEAR_ERROR(state) {
    state.error = null
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch('auth/autoLogin') // автологин
    await dispatch('settings/loadSettings') // загрузка общих настроек
    await dispatch('settings/loadGitIngo') // загрузка последних изменений
  }
}

export const getters = {
  error: (state) => state.error
}
