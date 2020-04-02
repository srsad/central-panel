/* eslint-disable prettier/prettier */
/**
 * Стор для работы с данными источника
 */

export const state = () => ({
  params: {}, // данные источника
  categories: [], // категории источника
  categoryName: '', // активная категория
  deviceList: [], // список устройств
  fastPrice: [] // таблица fastPrice источника
  // ...
})

export const actions = {
  /** Параметры источника и список категорий */
  async getPage({ commit }, id) {
    try {
      // данные источника
      const source = await this.$axios.$get('/api/v1/source-site/get/' + id)
      if (source.data) {
        commit('SET_PARAMS', source.data)
        // категории источника
        const categories = await this.$axios.$get(`https://${source.data.source}/rest/?get=slist`)
        commit('SET_CATEGORIES', categories)
      }
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  /** Список устройств и быстрый прайс категории */
  async getDeviceList({ commit }, { siteUrl, id }) {
    commit('SET_DEVICE_LIST', [])
    commit('SET_FAST_PRICE', [])
    try {
      // список устройств
      const deviceList = await this.$axios.$get(`https://${siteUrl}/rest/?get=dlist&categoryid=${id}`)
      if (deviceList.success !== 'false') {
        commit('SET_DEVICE_LIST', deviceList)
      } else {
        // быстрый прайс
        const fastPrice = await this.$axios.$get(`https://${siteUrl}/rest/?get=fmplist&categoryid=${id}`)
        if (fastPrice.success !== 'false') commit('SET_FAST_PRICE', fastPrice[0].tv_fastPrice)
      }
    } catch (e) {
      console.error('Ошибка, не удалось получить список устройств или быстрый прайс', e)
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  /** Установка названия категории */
  setCategoryName({ commit }, categoryName) {
    commit('SET_CATEGORY_NAME', categoryName)
  },
  /** Усановка списка устройств */
  setDeviceList({ commit }, deviceList) {
    commit('SET_DEVICE_LIST', deviceList)
  },
  /** Усановка быстрого прайса */
  setFastPrice({ commit }, fastPrice) {
    commit('SET_FAST_PRICE', fastPrice)
  }
}

export const mutations = {
  SET_PARAMS(state, params) {
    state.params = params
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_CATEGORY_NAME(state, categoryName) {
    state.categoryName = categoryName
  },
  SET_DEVICE_LIST(state, deviceList) {
    state.deviceList = deviceList
  },
  SET_FAST_PRICE(state, fastPrice) {
    state.fastPrice = fastPrice
  }
}

export const getters = {
  params: (state) => state.params,
  categories: (state) => state.categories
}
