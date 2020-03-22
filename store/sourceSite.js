/**
 * Стор для списка источников
 */

export const state = () => ({
  sources: [], // список источников
  source: null // источник для редактирования
})

export const actions = {
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/source-site/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async update({ commit }, formData) {
    try {
      // eslint-disable-next-line prettier/prettier
      await this.$axios.$post('/api/v1/source-site/update/' + formData._id, formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchItems({ commit }) {
    try {
      const domains = await this.$axios.$get('/api/v1/source-site/getall')
      commit('SET_SOURCES', domains.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_SOURCES(state, sources) {
    state.sources = sources
  },
  SET_SOURCE(state, source) {
    state.source = source
  }
}

export const getters = {
  sources: (state) => state.sources,
  source: (state) => state.source
}
