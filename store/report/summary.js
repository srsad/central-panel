/**
 * Стор для списка сводных отчетов
 */

export const state = () => ({
  reports: [], // список наименований отчетов
  report: null // выбранный отчет
})

export const actions = {
  async fetchItems({ commit }) {
    try {
      const reportList = await this.$axios.$get('/api/v1/report/summory/getall')
      commit('SET_REPORTS', reportList)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  /**
   * Обновляем расчетные данные выбранного отчета
   */
  updateTableBrands({ commit }, brands) {
    commit('UPDATE_TABLE_BRANDS', brands)
  }
}

export const mutations = {
  SET_REPORTS(state, reports) {
    state.reports = reports
  },
  SET_REPORT(state, report) {
    state.report = report
  },
  /**
   * Обновляем расчетные данные выбранного отчета
   */
  UPDATE_TABLE_BRANDS(state, brands) {
    state.reports.brands = brands
  }
}

export const getters = {
  reports: (state) => state.reports,
  report: (state) => JSON.parse(JSON.stringify(state.report))
}
