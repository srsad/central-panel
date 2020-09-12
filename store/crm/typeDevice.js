/**
 * Стор для типов устройств
 */

export const state = () => ({
  typeDevices: [], // список типов устройств
  typeDevice: null // тип устройства для редактирования
})

export const actions = {
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/crm/type-device/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async update({ commit }, formData) {
    try {
      // eslint-disable-next-line prettier/prettier
      await this.$axios.$put('/api/v1/crm/type-device/update/' + formData._id, formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchItems({ commit }) {
    try {
      const types = await this.$axios.$get('/api/v1/crm/type-device/getall')
      commit('SET_TYPE_REQUESTS', types.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_TYPE_REQUESTS(state, typeDevices) {
    state.typeDevices = typeDevices
  },
  SET_TYPE_REQUEST(state, typeDevice) {
    state.typeDevice = typeDevice
  }
}

export const getters = {
  typeDevices: (state) => state.typeDevices,
  typeDevice: (state) => state.typeDevice
}
