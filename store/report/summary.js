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
      // eslint-disable-next-line
      const reports = reportList.map(({ _id, name, branch_id }) => {
        return { _id, name, branch: branch_id.name }
      })
      commit('SET_REPORTS', reports)
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
