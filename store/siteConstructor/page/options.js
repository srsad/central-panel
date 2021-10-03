/**
 * Настройки страниц и сайта в общем - конструктор сайтов
 */

export const state = () => ({
  // <576px	sm | ≥576px	md | ≥768px	lg | ≥992px	xl | ≥1200px	xxl | ≥1400px
  width: 1400, // ширина экрана в конструкторе сайтов (панель навигации)
  drawerSectionTop: false, // окно со списком секций - топ
  drawerSectionMenu: false, // окно со списком секций - меню
  drawerSectionCover: false // окно со списком секций - Обложка
})

export const actions = {}

export const mutations = {
  SET_WIDTH(state, width) {
    state.width = width
  },

  /**
   * открыть/закрыть ящик
   */
  SWITCH_DRAWNER(state, { dranwer, status }) {
    state[dranwer] = status
  }
}

export const getters = {
  width: (state) => state.width
}
