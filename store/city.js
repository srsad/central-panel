/**
 * Стор списка городов
 */

export const state = () => ({
  сityes: [], // список городов
  city: null // город для редактирования
})

export const actions = {
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/settings/city/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async update({ commit }, formData) {
    try {
      // await console.log('formData', formData)
      // eslint-disable-next-line prettier/prettier
      await this.$axios.$post('/api/v1/settings/city/update/' + formData._id, formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchItems({ commit }) {
    try {
      const сityes = await this.$axios.$get('/api/v1/settings/city/getall')
      commit('SET_DOMAINS', сityes.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_DOMAINS(state, сityes) {
    state.сityes = сityes
  },
  SET_DOMAIN(state, city) {
    state.city = city
  }
}

export const getters = {
  сityes: (state) => state.сityes,
  domain: (state) => state.city
}
