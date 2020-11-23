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
  }
}

export const mutations = {
  SET_REPORTS(state, reports) {
    state.reports = reports
  },
  SET_REPORT(state, report) {
    state.report = report
  }
}

export const getters = {
  reports: (state) => state.reports,
  report: (state) => JSON.parse(JSON.stringify(state.report))
}
