/**
 * Стор для списка доменных имен
 */

export const state = () => ({
  damains: [], // список доменных имен
  damain: null // доменное имя для редактирования
})

export const actions = {
  async createDomain({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/domain/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async updateDomain({ commit }, formData) {
    try {
      await this.$axios.$put('/api/v1/domain/update/' + formData._id, formData)
      // commit('SET_DOMAINS', [])
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchDomains({ commit }) {
    try {
      const domains = await this.$axios.$get('/api/v1/domain/getall')
      commit('SET_DOMAINS', domains.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_DOMAINS(state, damains) {
    state.damains = damains
  },
  SET_DOMAIN(state, damain) {
    state.damain = damain
  }
}

export const getters = {
  domains: (state) => state.damains,
  domain: (state) => state.damain
}
