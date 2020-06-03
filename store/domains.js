/**
 * Стор для списка доменных имен
 */

export const state = () => ({
  damains: [], // список доменных имен
  damain: null, // доменное имя для редактирования
  emptyText: 'Нет данных' // при загрузке данных менять текст
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
      commit('SET_DOMAINS', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const domains = await this.$axios.$get('/api/v1/domain/getall')
      commit('SET_DOMAINS', domains.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    } finally {
      commit('SET_EMPTY_TEXT', 'Нет данных')
    }
  },
  async selectByAddress({ commit }, address) {
    try {
      commit('SET_DOMAINS', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const domains = await this.$axios.$get(
        '/api/v1/domain/byaddress/' + address
      )
      commit('SET_DOMAINS', domains.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    } finally {
      commit('SET_EMPTY_TEXT', 'Нет данных')
    }
  },
  updateMenuindex({ commit }, domains) {
    commit('SET_DOMAINS', domains)
  }
}

export const mutations = {
  SET_DOMAINS(state, damains) {
    state.damains = damains
  },
  SET_DOMAIN(state, damain) {
    state.damain = damain
  },
  SET_EMPTY_TEXT(state, text) {
    state.emptyText = text
  }
}

export const getters = {
  domains: (state) => state.damains,
  domain: (state) => state.damain,
  emptyText: (state) => state.emptyText
}
