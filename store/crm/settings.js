/**
 * Настройки CRM
 */

export const state = () => ({
  statuses: [] // статусы настроек
})

export const actions = {
  async fetchItems({ commit }) {
    try {
      const statuses = await this.$axios.$get(
        '/api/v1/crm/settings/status/getAll'
      )
      commit('SET_STATUSES', statuses.data)
      return true
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  /**
   * Создание
   */
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/crm/settings/status/create', formData)
      // commit('PUSH_STATUSES', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_STATUSES(state, statuses) {
    state.statuses = statuses
  },
  PUSH_STATUSES(state, status) {
    state.statuses.push(status)
  },
  REMOVE_STATUSES(state, status) {}
}

export const getters = {
  statuses: (state) => state.statuses
}
