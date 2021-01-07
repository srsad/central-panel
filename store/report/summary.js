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
  },

  /**
   * Возваращаем конкретный отчет
   */
  async findById({ commit, dispatch, rootState }, id) {
    try {
      const report = await this.$axios.$get('/api/v1/report/summory/get/' + id)
      // если список доменов не наполнен
      if (rootState.domains.damains.length === 0) {
        await dispatch('domains/fetchDomains', {}, { root: true })
      }
      commit('SET_REPORT', report)
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
  // eslint-disable-next-line
  report: (state, getters, rootState) => {
    const report = JSON.parse(JSON.stringify(state.report))
    if (!report?.brands) return report

    const domains = rootState.domains.damains

    const rserviceSPB = []
    const impulsSPB = []
    const rserviceMSK = []
    const impulsMSK = []

    // TODO костыль для сопоставляния филиала+адреса с компанией
    const branches = new Map([
      ['СПБ 2-я Красноармейская', 'R-service СПб'],
      ['СПБ Дмитровский', 'Impuls СПб'],
      ['МСК Новослободская', 'R-service МСК'],
      ['МСК Армянский', 'Impuls МСК'],
      ['МСК Сеславинская', 'Impuls МСК']
    ])

    for (const idx in report.brands) {
      const branch = branches.get(report.brands[idx].branch.name)
      const brand = report.brands[idx].brand.name.toLowerCase()
      let sortPriority = {
        priority: 150,
        priority2: 150,
        priority3: 150
      }

      // возвращаем найденные приоритеты
      for (const el of domains) {
        if (el.brand.toLowerCase() === brand && el.company === branch) {
          sortPriority = el
          break
        }
      }

      // достаем параметры для сортировки
      const item = {
        ...report.brands[idx],
        priority: +sortPriority.priority || 150,
        priority2: +sortPriority.priority2 || 150,
        priority3: +sortPriority.priority3 || 150
      }

      if (branch === 'R-service СПб') rserviceSPB.push(item)
      if (branch === 'R-service МСК') rserviceMSK.push(item)
      if (branch === 'Impuls СПб') impulsSPB.push(item)
      if (branch === 'Impuls МСК') impulsMSK.push(item)
    }

    // сортируем по приоритету
    // eslint-disable-next-line
    rserviceSPB.sort((a, b) => a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3)
    // eslint-disable-next-line
    impulsSPB.sort((a, b) => a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3)
    // eslint-disable-next-line
    rserviceMSK.sort((a, b) => a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3)
    // eslint-disable-next-line
    impulsMSK.sort((a, b) => a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3)

    report.brands = [...rserviceSPB, ...impulsSPB, ...rserviceMSK, ...impulsMSK]
    return report
  }
}
