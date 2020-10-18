/**
 * Стор для неисправностей
 */

export const state = () => ({
  malfunctions: [], // список неисправностей
  malfunction: null // тип неисправнсоть для редактирования
})

export const actions = {
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/crm/malfunction/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async update({ commit }, formData) {
    try {
      // eslint-disable-next-line prettier/prettier
      await this.$axios.$put('/api/v1/crm/malfunction/update/' + formData._id, formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchItems({ commit }) {
    try {
      const malfunction = await this.$axios.$get(
        '/api/v1/crm/malfunction/getall'
      )
      commit('SET_TYPE_REQUESTS', malfunction)
    } catch (e) {
      await commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchFirstItems({ commit }) {
    try {
      const malfunction = await this.$axios.$get(
        '/api/v1/crm/malfunction/getfirstitems'
      )
      commit('SET_TYPE_REQUESTS', malfunction.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_TYPE_REQUESTS(state, malfunctions) {
    state.malfunctions = malfunctions
  },
  SET_TYPE_REQUEST(state, malfunction) {
    state.malfunction = malfunction
  }
}

export const getters = {
  malfunctions: (state) => state.malfunctions,
  malfunction: (state) => state.malfunction
}
