/**
 * Стор для работы с данными источника
 */

export const state = () => ({
  params: {}, // данные источника
  categories: [] // категории источника
  // ...
})

export const actions = {
  async getPage({ commit }, id) {
    try {
      // данные источника
      const source = await this.$axios.$get('/api/v1/source-site/get/' + id)
      if (source.data) {
        commit('SET_PARAMS', source.data)
        // категории источника
        // eslint-disable-next-line prettier/prettier
        const categories = await this.$axios.$get(`https://${source.data.source}/rest/?get=slist`)
        commit('SET_CATEGORIES', categories)
      }
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_PARAMS(state, params) {
    state.params = params
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  }
}

export const getters = {
  params: (state) => state.params,
  categories: (state) => state.categories
}
