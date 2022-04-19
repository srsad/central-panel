/**
 * Категории бренда
 */

export const state = () => ({
  categories: [],
  category: null, // выбранная категория для редактирования
  selectCategory: null, // выбранная категория для просмотра
  emptyText: 'Нет данных' // при загрузке данных менять текст
})

export const actions = {
  async create({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/repair/category/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  async fetchItems({ commit }) {
    try {
      commit('SET_CATEGORIES', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const result = await this.$axios.$get('/api/v1/repair/category/getall')
      commit('SET_CATEGORIES', result)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    } finally {
      commit('SET_EMPTY_TEXT', 'Нет данных')
    }
  },

  async fetchItemsById({ commit }, brandId) {
    try {
      commit('SET_CATEGORIES', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const result = await this.$axios.$get(
        '/api/v1/repair/category/getallbyid/' + brandId
      )
      commit('SET_CATEGORIES', result)
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
        '/api/v1/repair/category/get/' + brandId
      )
      commit('SET_CATEGORY', result)
      return result
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_CATEGORY(state, category) {
    state.category = category
  },
  SET_SELECT_CATEGORY(state, category) {
    state.selectCategory = category
  },
  SET_EMPTY_TEXT(state, text) {
    state.emptyText = text
  }
}

export const getters = {
  categories: (state) => state.categories
}
