/**
 * Тут находятся общие и буферные настройки всего сайта
 */

// TODO вешать отдельные настройки в куку

export const state = () => ({
  isCollapse: true // скрытие/раскрытие бокового меню
})

export const actions = {
  switchIsCollapse({ commit }, status) {
    commit('SWITCH_ISCOLLAPSE', status)
  }
}

export const mutations = {
  SWITCH_ISCOLLAPSE(state, status) {
    state.isCollapse = status
  }
}
