/**
 * Сайты сделанные конструктором, раздел с каталогом сайтов
 */

export const state = () => ({
  sites: [], // список сайтов
  site: null // сайт для редактирования
})

export const actions = {
  /**
   * Создание
   */
  async createItem({ commit }, { formData }) {
    try {
      await this.$axios.$post('/api/v1/constructor/site/create', formData)
      return true
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  /**
   * Обновление
   */
  async updateItem({ state, commit }, formData) {
    try {
      await this.$axios.$put(
        '/api/v1/constructor/site/update/' + formData._id,
        formData
      )
      // for (const idx in state.sites) {
      //   if (state.sites[idx]._id === formData._id) {
      //     commit('UPDATE_SITE', { idx, data: formData })
      //     break
      //   }
      // }
      return true
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  /**
   * Список сайтов
   */
  async fetchItems({ commit }) {
    try {
      const { data } = await this.$axios.$get(
        '/api/v1/constructor/site/getall/'
      )
      commit('SET_SITES', data)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  /**
   * Проверка сайта на наличие. Используется для валиадации
   */
  async checkSite({ commit }, siteId) {
    try {
      const res = await this.$axios.get(
        '/api/v1/constructor/site/get/' + siteId
      )
      return res.data
    } catch (e) {
      console.error(
        '[store/siteConstructor/sites.js/ action => checkSite] Не удалось проверить сайт'
      )
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  }
}

export const mutations = {
  SET_SITES(state, sites) {
    state.sites = sites
  },
  SET_SITE(state, site) {
    state.site = site
  },
  UPDATE_SITE(state, { idx, site }) {
    for (const key in state.sites[idx]) {
      state.sites[idx][key] = site[key]
    }
  }
}

export const getters = {
  sites: (state) => JSON.parse(JSON.stringify(state.sites)),
  site: (state) => state.site
}
