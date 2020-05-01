/**
 * Тут находятся общие и буферные настройки всего сайта
 */
import Cookie from 'cookie'
import Cookies from 'js-cookie'

/**
 * Общие настройки интерфейса сайта
 */

export const state = () => ({
  lastUpdate: null, // последние данные по обновлению, sha + дата изменения + комментарий
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
  drawerUpdatePartItem: false, // Окно для редактироавния детали
  drawerPartList: false, // Окно списка деталей/неисправностей категории
  drawerAddDevice: false, // Окно создания устроиства
  drawerUpdateNotRecording: false, // Окно редактирования "техники не для записи"
  drawerCreateForRecording: false, // Окно создания "техники для записи"
  drawerUpdateForRecording: false // Окно редактирования "техники для записи"
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
  },
  async loadGitIngo({ commit }) {
    try {
      const git = await this.$axios.$get(
        // `https://api.github.com/user/repos`,
        `https://api.github.com/repos/srsad/central-panel/branches/alfa`,
        {
          headers: {
            Authorization: 'token ' + process.env.GITHUB_TOKEN
          }
        }
      )
      commit('SET_LAST_UPDATE', {
        sha: git.commit.sha,
        message: git.commit.commit.message,
        date: git.commit.commit.committer.date
      })
    } catch (e) {
      console.error('Ошибка при получении данных из github', e.response)
      commit('SET_ERROR', 'Ошибка при получении данных из github', {
        root: true
      })
    }
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
  },
  SET_LAST_UPDATE(state, lastUpdate) {
    state.lastUpdate = lastUpdate
  }
}

export const getters = {
  breadcrumbs: (state) => state.breadcrumbs,
  lastUpdate: (state) => state.lastUpdate
}
