/**
 * Стор для типов заявки
 */

export const state = () => ({
  typeRequests: [], // список типов заявок
  typeRequest: null // тип заявки для редактирования
})

export const actions = {
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/crm/type-request/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async update({ commit }, formData) {
    try {
      // eslint-disable-next-line prettier/prettier
      await this.$axios.$post('/api/v1/crm/type-request/update/' + formData._id, formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchItems({ commit }) {
    try {
      const types = await this.$axios.$get('/api/v1/crm/type-request/getall')
      commit('SET_TYPE_REQUESTS', types.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_TYPE_REQUESTS(state, typeRequests) {
    state.typeRequests = typeRequests
  },
  SET_TYPE_REQUEST(state, typeRequest) {
    state.typeRequest = typeRequest
  }
}

export const getters = {
  typeRequests: (state) => state.typeRequests,
  typeRequest: (state) => state.typeRequest
}
