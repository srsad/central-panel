/**
 * Список устроийств
 */

export const state = () => ({
  devices: [], // список устройств
  device: null, // выбранное устройство
  malfunctions: null, // неисправности данного устройства
  emptyText: 'Нет данных' // при загрузке данных менять текст
})

export const actions = {
  async create({ commit }, formData) {
    try {
      const { data } = await this.$axios.$post(
        '/api/v1/repair/device/create',
        formData
      )
      return data
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  async fetchByCategoryId({ commit }, brandId) {
    try {
      commit('SET_DEVICES', [])
      commit('SET_EMPTY_TEXT', 'Загрузка данных')
      const result = await this.$axios.$get(
        '/api/v1/repair/device/getall-by-category-id/' + brandId
      )
      commit('SET_DEVICES', result)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    } finally {
      commit('SET_EMPTY_TEXT', 'Нет данных')
    }
  },

  async fetchById({ commit }, itemId) {
    try {
      const result = await this.$axios.$get(
        '/api/v1/repair/device/get/' + itemId
      )
      commit('SET_DEVICE', result)
      return result
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },

  /**
   * Добавление новгого (только созданного) устройства в общий список устройств
   */
  localAdd({ state, commit }, item) {
    const items = JSON.parse(JSON.stringify(state.devices))
    items.push(item)
    commit('SET_DEVICES', items)
  },

  /**
   * Удаление устройства из общего списока устройств
   */
  localRemove({ state, commit }, itemId) {
    let items = JSON.parse(JSON.stringify(state.devices))
    items = items.filter((el) => el._id !== itemId)
    commit('SET_DEVICES', items)
  },

  /**
   * Установка неисправностей к устройству
   */
  setMalfunctionsForDevice({ rootGetters, commit, state }, device) {
    // eslint-disable-next-line
    const malfunctionCategory = rootGetters['repair/malfunction/getMalfunctionCategory']
    const partsCategory = rootGetters['repair/category/partsCategory']
    const malfunctions = new Map()

    // проходимся по списку неисправностей
    for (const item of malfunctionCategory) {
      malfunctions.set(item.name, {
        _id: '',
        partPrice: '',
        ...item
      })
    }

    // проходимся по списку деталей
    for (const item of partsCategory) {
      const malf = { ...malfunctions.get(item.name) }
      let price = item.price
      let excepts = false

      if (item.excepts) {
        for (const el of item.excepts) {
          if (el.model === state.device.name) {
            price = el.price
            excepts = true
            break
          }
        }
      }

      malf._id = item._id
      malf.name = item.name
      malf.time = item.time ?? 60
      malf.price = item.rservice // цена ремонта
      malf.partPrice = price // цена детали
      malf.excepts = excepts

      malfunctions.set(item.name, malf)
    }

    // наполняем ответ
    const result = []
    malfunctions.forEach((el) => result.push(el))

    commit('SET_MALFUNCTIONS', result)
  }
}

export const mutations = {
  SET_DEVICES(state, devices) {
    state.devices = devices
  },
  SET_DEVICE(state, device) {
    state.device = device
  },
  SET_EMPTY_TEXT(state, text) {
    state.emptyText = text
  },
  SET_MALFUNCTIONS(state, malfunctions) {
    state.malfunctions = malfunctions
  }
}

export const getters = {
  device: (state) => state.device,
  malfunctions: (state) => state.malfunctions
}
