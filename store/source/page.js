/* eslint-disable prettier/prettier */
/**
 * Стор для работы с данными источника
 */
import Cookie from 'cookie'

export const state = () => ({
  params: {}, // данные источника
  categories: [], // категории источника
  categoryName: '', // активная категория
  deviceList: [], // список устройств
  fastPrice: [], // таблица fastPrice источника
  deviceData: null, // данные выбраного устройства - {id: "245", pagetitle: "..."}
  partsCategory: [], // список неисправностей выбранной категории
  partItem: null, // деталь для редактировать
  malfunctionsData: null // список неисправностей выбранного устройства
  // ...
})

export const actions = {
  /** Параметры источника и список категорий */
  async getPage({ commit }, id) {
    commit('SET_PARAMS', {})
    try {
      // данные источника
      // TODO доставать из стора
      const source = await this.$axios.$get('/api/v1/source-site/get/' + id)
      if (source.data) {
        const params = JSON.parse(JSON.stringify(source.data))
        delete params.categories
        commit('SET_PARAMS', params)
        // категории источника
        commit('SET_CATEGORIES', source.data.categories)
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
      this.$axios.setToken(false)
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
    } finally {
      // TODO ставить токен из стора settings
      this.$axios.setToken(getCookiesToken(), 'Bearer')
    }
  },
  async getParts({ commit, state }) {
    try {
      const parts = await this.$axios.$get('/api/v1/part/getAll', {
        params: {
          brand: state.params.brand,
          category: state.categoryName
        }
      })
      commit('SET_PARTS', parts.data)
    } catch (e) {
      console.error('Ошибка, не удалось получить список устройств или быстрый прайс', e)
      commit('SET_ERROR', e.response.data.message, { root: true })
      throw e
    }
  },
  /** Установка списка категорий */
  setCategories({ commit }, categories) {
    commit('SET_CATEGORIES', categories)
  },
  /** Установка детали для редактирования */
  setPart({ commit }, part) {
    commit('SET_PART', part)
  },
  /** Установка параметров источника */
  setParams({ commit }, patams) {
    commit('SET_PARAMS', patams)
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
  },
  /** установка данных устройства и загрузка неисправностей данного устройства */
  async setDeviceData({ commit, state }, deviceData) {
    commit('SET_DEVICE_DATA', deviceData)
    try {
      this.$axios.setToken(false)
      const malfunctions = await this.$axios.$get(
        `https://${state.params.source}/rest/?get=dmlist&device=${deviceData.id}&company=${state.params.company}`
      )
      commit('SET_MALFUNCTIONS_DATA', malfunctions)
    } catch (e) {
      commit('SET_ERROR', e.response.data.message, { root: true })
    } finally {
      // TODO ставить токен из стора settings
      this.$axios.setToken(getCookiesToken(), 'Bearer')
    }
  },
  /** Отчистка всех параметров */
  clearAllParams({ commit }) {
    commit('CLEAR_ALL_PARAMS')
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
  },
  SET_DEVICE_DATA(state, deviceData) {
    state.deviceData = deviceData
  },
  SET_MALFUNCTIONS_DATA(state, malfunctionsData) {
    state.malfunctionsData = malfunctionsData
  },
  SET_PARTS(state, parts) {
    state.partsCategory = parts
  },
  SET_PART(state, part) {
    state.partItem = part
  },
  CLEAR_ALL_PARAMS(state) {
    state.params = {}
    state.categories = []
    state.categoryName = ''
    state.deviceList = []
    state.fastPrice = []
    state.malfunctionsCategory = []
    state.malfunctionsData = null
  }
}

export const getters = {
  params: (state) => state.params,
  categories: (state) => state.categories,
  deviceList: (state) => state.deviceList,
  fastPrice: (state) => {
    if (state.fastPrice.length === 0) return state.fastPrice
    if (state.partsCategory.length === 0 && state.fastPrice) return state.fastPrice

    let res = JSON.parse(JSON.stringify(state.fastPrice))
    // проходимся по списку деталей
    for (const item of state.partsCategory) {
      const pPrice = state.params.company === 'impuls' ? item.impuls : item.rservice
      // если есть совподение с fastPrice
      const where = (el) => el.pTitle === item.name
      if (res.some(where)) {
        res = res.map((element) => {
          if (element.pTitle === item.name) {
            // если не пусто
            if (pPrice) element.pPrice = pPrice
            element.partPrice = item.price
            element.isParts = true
          }
          return element
        })
      } else {
        res.push({
          id: '',
          pTitle: item.name,
          partPrice: '',
          pPrice,
          isParts: true // если это из списка деталей
        })
      }
    }
    return res
  },
  deviceData: (state) => state.deviceData,
  partsCategory: (state) => state.partsCategory,
  /** Список деталей и неисправностей */
  malfunctionsData: (state) => {
    if (!state.malfunctionsData || !state.partsCategory) return
    const malfunctions = new Map()
    // _id - если из списка деталей
    // name - наименование, проверяем на сходство из списка неисправностей и списка деталей
    // time - время ремонта
    // price - цена детали, если есть исключение то цена из исключения
    // rprice - цена для rprice, если есть исключение то цена из исключения
    // iprice - цена для iprice, если есть исключение то цена из исключения
    // проходимся по списку неисправностей
    for (const item of state.malfunctionsData) {
      malfunctions.set(item.pagetitle, {
        _id: '',
        name: item.pagetitle,
        time: item.value,
        price: '',
        rprice: item.price,
        iprice: item.price2,
        excepts: false
      })
    }
    // проходимся по списку деталей
    for (const item of state.partsCategory) {
      const malf = {...malfunctions.get(item.name)}
      let price = item.price
      let excepts = false
      // поиск цены детали для исключения
      if (item.excepts) {
        for (const el of item.excepts) {
          if (el.model === state.deviceData.pagetitle) {
            price = el.price
            excepts = true
            break
          }
        }
      }

      malf._id = item._id
      malf.name = item.name
      if (price) malf.price = price
      if (item.rservice) malf.rprice = item.rservice
      if (item.impuls) malf.iprice = item.impuls
      malf.excepts = excepts
      malfunctions.set(item.name, malf)
    }
    // наполняем ответ
    const res = []
    malfunctions.forEach((el) => res.push(el))
    return res
  }
}

/**
 * Отдает токен из куки
 * TODO это костыль, но как делать отдельные ззапросы вне конткста красиво, я пока не придумал
 */
function getCookiesToken() {
  const cookieStr = process.browser
    ? document.cookie
    : this.app.context.req.headers.cookie
  const cookies = Cookie.parse(cookieStr || '') || {}
  return cookies['jwt-token']
}
