/**
 * Стор для списка филиалов
 */

export const state = () => ({
  branches: [], // список брендов
  branch: null // бренд для редактирования
})

export const actions = {
  async fetchItems({ commit }) {
    try {
      const branches = await this.$axios.$get('/api/v1/report/branch/getall')
      commit('SET_BRANCHS', branches)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_BRANCHS(state, branches) {
    state.branches = branches
  },
  SET_BRANCH(state, branch) {
    state.branch = branch
  }
}

export const getters = {
  branches: (state) => state.branches,
  branch: (state) => state.branch
}
