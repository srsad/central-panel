/**
 * Список устроийств
 */

export const state = () => ({
  devices: [], // список устройств
  device: null, // выбранное устройство
  emptyText: 'Нет данных' // при загрузке данных менять текст
})

export const actions = {
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/repair/device/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  async fetchByBrandId({ commit }, brandId) {
    try {
      commit('SET_DEVICES', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const result = await this.$axios.$get(
        '/api/v1/repair/device/getall-by-brand-id/' + brandId
      )
      commit('SET_DEVICES', result)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    } finally {
      commit('SET_EMPTY_TEXT', 'Нет данных')
    }
  },

  async fetchById({ commit }, itemId) {
    try {
      const result = await this.$axios.$get(
        '/api/v1/repair/device/get/' + itemId
      )
      commit('SET_DEVICE', result)
      return result
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_DEVICES(state, devices) {
    state.devices = devices
  },
  SET_DEVICE(state, device) {
    state.device = device
  },
  SET_EMPTY_TEXT(state, text) {
    state.emptyText = text
  }
}

export const getters = {}
