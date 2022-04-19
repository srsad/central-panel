/**
 * Работа с неисправностями
 */

export const state = () => ({
  malfunctions: [],
  malfunction: null, // выбранный бренд для редактироваия
  emptyText: 'Нет данных' // при загрузке данных менять текст
})

export const actions = {
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/repair/malfunction/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  async fetchItems({ commit }) {
    try {
      commit('SET_MALFUNCTIONS', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const result = await this.$axios.$get('/api/v1/repair/malfunction/getall')
      commit('SET_MALFUNCTIONS', result)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    } finally {
      commit('SET_EMPTY_TEXT', 'Нет данных')
    }
  },

  async fetchById({ commit }, brandId) {
    try {
      const result = await this.$axios.$get(
        '/api/v1/repair/malfunction/get/' + brandId
      )
      commit('SET_MALFUNCTION', result)
      return result
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_MALFUNCTIONS(state, malfunctions) {
    state.malfunctions = malfunctions
  },
  SET_MALFUNCTION(state, malfunction) {
    state.malfunction = malfunction
  },
  SET_EMPTY_TEXT(state, text) {
    state.emptyText = text
  }
}

export const getters = {
  getMalfunctionById: (state) => {
    return (malfunctionId) => {
      return state.malfunctions.find((el) => el._id === malfunctionId)
    }
  }
}
