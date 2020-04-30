/**
 * Стор для списка источников
 */

export const state = () => ({
  sources: [], // список источников
  source: null // источник для редактирования
})

export const actions = {
  async fetchItems({ commit }) {
    try {
      const domains = await this.$axios.$get('/api/v1/source-site/getall')
      commit('SET_SOURCES', domains.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_SOURCES(state, sources) {
    state.sources = sources
  },
  SET_SOURCE(state, source) {
    state.source = source
  }
}

export const getters = {
  sources: (state) => state.sources,
  source: (state) => state.source,
  /**
   * Возвращает список отсортированный по компаниям
   * sources: {
   *    rservice: [
   *      { name: 'Apple 1', _id: 1 ...},
   *      ...
   *    ],
   *    impuls: [
   *      { name: 'MSI 5', _id: 5 ...},
   *      ...
   *    ],
   *    ...
   *  }
   */
  sortSources: (state) => {
    const res = {}
    for (const item of state.sources) {
      if (!res.hasOwnProperty(item.company)) res[item.company] = []
      res[item.company].push(item)
    }
    // надо обязательно проверить, существует ли одна из обязательных компаний, если нет, то надо создать
    // чтоб не возникало ошибки, когда мы перетащили все бренды в одну и не можем вернуть что-то обратно в пустую компанию
    if (!res.impuls) res.impuls = []
    if (!res.rservice) res.rservice = []
    return res
  },
  /** Возвращает только уникальный список текущих бренодов */
  sourcesName: (state) => {
    const brands = state.sources.map((el) => el.brand)
    const res = [...new Set(brands)].map((el) => {
      return { value: el }
    })
    return res
  },
  /** Список источников для поиска */
  sourceSearchList: (state) => {
    const res = []
    state.sources.forEach((el) => {
      res.push({
        value: el.brand + ' ' + el.company,
        link: '/company/' + el._id
      })
    })
    return res
  }
}
