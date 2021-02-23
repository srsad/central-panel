// import flatten from 'flat'

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

    const domains = JSON.parse(JSON.stringify(rootState.domains.damains))

    // TODO костыль для сопоставляния филиала+адреса с компанией
    const branches = new Map([
      ['СПБ 2-я Красноармейская', 'R-service СПб'],
      ['СПБ Дмитровский', 'Impuls СПб'],
      ['МСК Новослободская', 'R-service МСК'],
      ['МСК Армянский', 'Impuls МСК'],
      ['МСК Сеславинская', 'Impuls МСК']
    ])

    // результат выполнения
    const res = []

    for (const idx in report.brands) {
      const branch = branches.get(report.brands[idx].branch.name) // текущий филлиал
      const brand = report.brands[idx].brand.name.toLowerCase()

      let dcod = '99.00.00.00.00.00.00.00' // код по умолчанию

      // возвращаем найденные приоритеты
      for (const el of domains) {
        if (el.brand.toLowerCase() === brand && el.company === branch) {
          let _dcod = el.dcod.split('.')
          _dcod = +_dcod[0]
          if (_dcod < 90) {
            dcod = el.dcod
            break
          }
        }
      }

      // достаем параметры для сортировки
      res.push({ ...report.brands[idx], dcod })
    }

    // сортируем по доменному коду
    res.sort(function(a, b) {
      const aCode = a.dcod.replace(/\./g, '')
      const bCode = b.dcod.replace(/\./g, '')
      if (+aCode > +bCode) return 1
      if (+aCode < +bCode) return -1
      return 0
    })

    // проверяем является ли элемент филлиала последним

    report.brands = [...res]
    return report
  }
}
