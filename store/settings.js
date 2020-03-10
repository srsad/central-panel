/**
 * Тут находятся общие и буферные настройки всего сайта
 */
import Cookie from 'cookie'
import Cookies from 'js-cookie'

/**
 * Общие настройки интерфейса сайта
 */

export const state = () => ({
  isCollapse: true, // скрытие/раскрытие бокового меню
  drawerCreateRole: false, // Окно для создания роли
  drawerUpdateRole: false // Окно для редактироавния роли
})

export const actions = {
  switchIsCollapse({ commit }, status) {
    commit('SWITCH_ISCOLLAPSE', status)
  },
  loadSettings({ commit }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const sitebarStatus = cookies.sitebarStatus !== 'false'
    commit('SWITCH_ISCOLLAPSE', sitebarStatus)
  }
}

export const mutations = {
  SWITCH_ISCOLLAPSE(state, status) {
    state.isCollapse = status
    Cookies.set('sitebarStatus', status)
  },
  /** открыть/закрыть ящик */
  SWITCH_DRAWNER(state, { dranwer, status }) {
    state[dranwer] = status
  }
}
