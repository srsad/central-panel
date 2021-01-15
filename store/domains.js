/**
 * Стор для списка доменных имен
 */

export const state = () => ({
  damains: [], // список доменных имен
  damain: null, // доменное имя для редактирования
  emptyText: 'Нет данных' // при загрузке данных менять текст
})

export const actions = {
  async createDomain({ commit }, formData) {
    try {
      await this.$axios.$post('/api/v1/domain/create', formData)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async updateDomain({ state, commit }, formData) {
    try {
      await this.$axios.$put('/api/v1/domain/update/' + formData._id, formData)
      for (const idx in state.damains) {
        if (state.damains[idx]._id === formData._id) {
          commit('UPDATE_DOMAIN', { idx, data: formData })
          break
        }
      }
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  async fetchDomains({ commit }) {
    try {
      commit('SET_DOMAINS', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const { data } = await this.$axios.$get('/api/v1/domain/getall')
      commit('SET_DOMAINS', data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    } finally {
      commit('SET_EMPTY_TEXT', 'Нет данных')
    }
  },
  async selectByAddress({ commit }, address) {
    try {
      commit('SET_DOMAINS', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const domains = await this.$axios.$get(
        '/api/v1/domain/byaddress/' + address
      )
      commit('SET_DOMAINS', domains.data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    } finally {
      commit('SET_EMPTY_TEXT', 'Нет данных')
    }
  },
  updateMenuindex({ commit }, domains) {
    commit('SET_DOMAINS', domains)
  }
}

export const mutations = {
  SET_DOMAINS(state, damains) {
    state.damains = damains
  },
  SET_DOMAIN(state, damain) {
    state.damain = damain
  },
  /**
   * обновляем локальную, конкретную позицию
   */
  UPDATE_DOMAIN(state, { idx, data }) {
    for (const key in state.damains[idx]) {
      state.damains[idx][key] = data[key]
    }
  },
  SET_EMPTY_TEXT(state, text) {
    state.emptyText = text
  }
}

export const getters = {
  domains: (state) => {
    const res = state.damains
    // сортируем по доменному коду
    res.sort(function(a, b) {
      const aCode = a.dcod.replace(/\./g, '')
      const bCode = b.dcod.replace(/\./g, '')
      if (+aCode > +bCode) return 1
      if (+aCode < +bCode) return -1
      return 0
    })

    // // TODO вынести это на сторону бд
    // const rserviceSPB = []
    // const impulsSPB = []
    // const rserviceMSK = []
    // const impulsMSK = []
    // const rserviceKRD = []
    // const impulsKRD = []
    // // разбиваем по филиалам
    // // R-service СПб→Impuls СПб→R-service МСК→Impuls МСК
    // state.damains.forEach((el) => {
    //   if (el.company === 'R-service СПб') rserviceSPB.push(el)
    //   if (el.company === 'R-service МСК') rserviceMSK.push(el)
    //   if (el.company === 'R-service КРД') rserviceKRD.push(el)
    //   if (el.company === 'Impuls СПб') impulsSPB.push(el)
    //   if (el.company === 'Impuls МСК') impulsMSK.push(el)
    //   if (el.company === 'Impuls КРД') impulsKRD.push(el)
    // })

    // // сортируем по приоритету
    // // eslint-disable-next-line
    // rserviceSPB.sort((a, b) => (a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3))
    // // eslint-disable-next-line
    // impulsSPB.sort((a, b) => (a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3))
    // // eslint-disable-next-line
    // rserviceMSK.sort((a, b) => (a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3))
    // // eslint-disable-next-line
    // impulsMSK.sort((a, b) => (a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3))
    // // eslint-disable-next-line
    // rserviceKRD.sort((a, b) => (a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3))
    // // eslint-disable-next-line
    // impulsKRD.sort((a, b) => (a.priority2 - b.priority || a.priority2 - b.priority2 || a.priority3 - b.priority3))

    // return [
    //   ...rserviceSPB,
    //   ...impulsSPB,
    //   ...rserviceMSK,
    //   ...impulsMSK,
    //   ...rserviceKRD,
    //   ...impulsKRD
    // ]
    return res
  },
  domain: (state) => state.damain,
  emptyText: (state) => state.emptyText
}
