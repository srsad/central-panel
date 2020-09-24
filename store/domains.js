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
    // TODO вынести это на сторону бд
    const rserviceSPB = []
    const impulsSPB = []
    const rserviceMSK = []
    const impulsMSK = []
    const rserviceKRD = []
    const impulsKRD = []
    // общее
    // R-service СПб→Impuls СПб→R-service МСК→Impuls МСК
    state.damains.forEach((el) => {
      if (el.company === 'R-service СПб') rserviceSPB.push(el)
      if (el.company === 'R-service МСК') rserviceMSK.push(el)
      if (el.company === 'R-service КРД') rserviceKRD.push(el)
      if (el.company === 'Impuls СПб') impulsSPB.push(el)
      if (el.company === 'Impuls МСК') impulsMSK.push(el)
      if (el.company === 'Impuls КРД') impulsKRD.push(el)
    })
    return [
      ...rserviceSPB,
      ...impulsSPB,
      ...rserviceMSK,
      ...impulsMSK,
      ...rserviceKRD,
      ...impulsKRD
    ]
  },
  domain: (state) => state.damain,
  emptyText: (state) => state.emptyText
}
