/**
 * Работа с брендом
 */

export const state = () => ({
  brands: [],
  brand: null, // выбранный бренд
  selectBrand: null, // выбраннsq бренд редактироавния
  emptyText: 'Нет данных' // при загрузке данных менять текст
})

export const actions = {
  async createBrand({ commit }, formData) {
    try {
      const fd = new FormData()
      fd.append('name', formData.name)
      if (formData.image) {
        this.$axios.setHeader('Content-Type', 'multipart/form-data')
        fd.append('image', formData.image.raw)
      }

      await this.$axios.$post('/api/v1/repair/brand/create', fd)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  async fetchItems({ commit }) {
    try {
      commit('SET_BRANDS', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const result = await this.$axios.$get('/api/v1/repair/brand/getall')
      commit('SET_BRANDS', result)
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
        '/api/v1/repair/brand/get/' + brandId
      )
      commit('SET_BRAND', result)
      return result
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_BRANDS(state, brands) {
    state.brands = brands
  },
  SET_BRAND(state, brand) {
    state.brand = brand
  },
  SET_SELECT_BRAND(state, selectBrand) {
    state.selectBrand = selectBrand
  },
  SET_EMPTY_TEXT(state, text) {
    state.emptyText = text
  }
}

export const getters = {
  brand: (state) => state.brand
}
