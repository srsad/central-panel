/**
 * Стор для списка брендов
 */

export const state = () => ({
  brands: [], // список брендов
  brand: null // бренд для редактирования
})

export const actions = {
  async fetchItems({ commit }) {
    try {
      const brands = await this.$axios.$get('/api/v1/report/brand/getall')
      commit('SET_BRANDS', brands)
    } catch (e) {
      console.error('Не удалось получить список брендов', e.response)
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
  }
}

export const getters = {
  brands: (state) => {
    const res = state.brands.map((el, idx) => {
      return { idx: idx + 1, ...el }
    })
    return res
  },
  brand: (state) => state.brand
}
