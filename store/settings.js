/**
 * Тут находятся общие и буферные настройки всего сайта
 */
import Cookie from 'cookie'
import Cookies from 'js-cookie'

/**
 * Общие настройки интерфейса сайта
 */

export const state = () => ({
  breadcrumbs: [], // хлебные крошки
  isCollapse: true, // скрытие/раскрытие бокового меню
  drawerCreateRole: false, // Окно для создания роли
  drawerUpdateRole: false, // Окно для редактироавния роли
  drawerCreateUser: false, // Окно для создания пользователя
  drawerUpdateUser: false, // Окно для редактироавния пользователя
  drawerCreateDomains: false, // Окно для добавления доменного имени
  drawerUpdateDomains: false, // Окно для редактироавния доменного имени
  drawerCreateSource: false, // Окно для создания/подключения нового источника (подключем новый сайт)
  drawerUpdateSource: false, // Окно для редактироавния нового источника
  drawerDeviceMalf: false, // Окно со списком неисправностей устройства
  drawerCreatePartItem: false, // Окно для создания детали
  drawerUpdatePartItem: false // Окно для редактироавния детали
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
  },
  setBreadcrumbs({ commit }, breadcrumbs) {
    commit('SET_BREADCRUMBS', breadcrumbs)
  }
}

export const mutations = {
  /** Сайдбар админки */
  SWITCH_ISCOLLAPSE(state, status) {
    state.isCollapse = status
    Cookies.set('sitebarStatus', status)
  },
  /** открыть/закрыть ящик */
  SWITCH_DRAWNER(state, { dranwer, status }) {
    state[dranwer] = status
  },
  /** Установка хлебных крошек */
  SET_BREADCRUMBS(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs
  }
}

export const getters = {
  breadcrumbs: (state) => state.breadcrumbs
}
