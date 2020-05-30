/**
 * Стор тепловых карт
 */

import moment from 'moment'

export const state = () => ({
  city: 'Санкт-Петербург', // выбранный город
  // массив с городами и кординатами их центра
  cities: [
    {
      city: 'Санкт-Петербург',
      coords: [59.93526597038887, 30.345803639545135]
    },
    {
      city: 'Москва',
      coords: [55.73948223998903, 37.64850972949218]
    },
    {
      city: 'Краснодарский край',
      coords: [45.033938975987894, 39.03155537060541]
    }
  ],
  // дата поумолчанию
  dateRange: [
    moment(Date.now()).format('YYYYMMDD'),
    moment(Date.now()).format('YYYYMMDD')
  ],
  points: null // Точки на карте
})

export const actions = {
  async fetchPonits({ commit, state }) {
    // await console.log('state', state.dateRange)
    try {
      commit('SET_POINTS', null)
      const points = await this.$axios.$get(
        'https://rloger.herokuapp.com/api/log/getdeterange/',
        {
          headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
          params: {
            range: {
              start: state.dateRange[0],
              end: state.dateRange[1]
            },
            city: state.city
          }
        }
      )
      this.mapPoints = []
      // console.log('points', points.data)
      commit('SET_POINTS', points.data)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
    }
  },
  setPoints({ commit }, points) {
    commit('SET_POINTS', points)
  },
  setCity({ commit }, city) {
    commit('SET_CITY', city)
  },
  setDateRange({ commit }, dateRange) {
    commit('SET_DATE_RANGE', dateRange)
  }
}

export const mutations = {
  SET_CITY(state, city) {
    state.city = city
  },
  SET_DATE_RANGE(state, dateRange) {
    state.dateRange = dateRange
  },
  SET_POINTS(state, points) {
    state.points = points
  }
}

export const getters = {
  city: (state) => state.city,
  points: (state) => state.points, // полные данные о точках
  //  только координаты
  onlyPoints: (state) => {
    const res = []
    for (const item of state.points) {
      res.push([item.lat, item.long])
    }
    return res
  },
  pointLength: (state) => (state.points === null ? 0 : state.points.length),
  // TODO опечатка cityes => cities
  cityes: (state) => state.cities,
  dateRange: (state) => state.dateRange
}
