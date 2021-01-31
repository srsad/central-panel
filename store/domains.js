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
    const res = JSON.parse(JSON.stringify(state.damains))
    // сортируем по доменному коду
    res.sort(function(a, b) {
      const aCode = a.dcod.replace(/\./g, '')
      const bCode = b.dcod.replace(/\./g, '')
      if (+aCode > +bCode) return 1
      if (+aCode < +bCode) return -1
      return 0
    })

    // группируем бренды, которые работают под разную рекламные кампании
    let rowspan = 0
    for (let i = 0; i <= res.length - 1; i++) {
      if (i === 0 || res[i + 1]) {
        const currentIten = res[i].dcod.split('.')
        const nextIten = res[i + 1].dcod.split('.')
        // если бренд и филлиал схожи
        if (
          currentIten[0] === nextIten[0] &&
          currentIten[1] === nextIten[1] &&
          currentIten[2] === nextIten[2]
        ) {
          rowspan += 1
          res[i].rowspan = 999
          // если не входит в группу
        } else if (rowspan === 0) {
          res[i].rowspan = 0
        } else {
          res[i - rowspan].rowspan = rowspan
          res[i].rowspan = 999 // индекс при вхождении в нруппу
          rowspan = 0
        }
      }
      if (res.length - 1 === i) {
        if (rowspan === 0) {
          res[i - rowspan].rowspan = rowspan
          res[i].rowspan = 0
        } else {
          res[i - rowspan].rowspan = rowspan
          res[i].rowspan = 999
        }
      }
    }

    return res
  },
  domain: (state) => state.damain,
  emptyText: (state) => state.emptyText
}
