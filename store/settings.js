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
  tableEmptyText: 'Нет данных', // текст при пустой таблице
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
  drawerUpdateForRecording: false, // Окно редактирования "техники для записи"
  drawerReportSummarySheetCreateBrand: false, // Окно создания бренда для отчета - вкладка "Сводные листы"
  drawerReportSummarySheetUpdateBrand: false, // Окно обновления бренда для отчета - вкладка "Сводные листы"
  drawerReportSummarySheetCreate: false, // Окно создания отчета - вкладка "Сводные листы"
  drawerReportSummaryUpdateCreate: false, // Окно обновления отчета - вкладка "Сводные листы"
  drawerCRMCreateStatus: false, // Окно создания статуса в CRM
  drawerCRMUpdateStatus: false, // Окно обновления статуса в CRM
  drawerCreateOrder: false, // Окно создания заявки в CRM
  drawerUpdateOrder: false, // Окно обновления заявки в CRM
  drawerCreateClient: false, // Окно создания клиента в CRM
  drawerUpdateClient: false, // Окно обновления клиента в CRM
  drawerSiteTestimonialCreate: false, // Окно создания отзыва
  drawerSiteTestimonialUpdate: false, // Окно редактирования отзыва
  drawerReportScheduleCreate: false, // Окно создания новго расписания в разделе отчеты
  drawerReportBranchUpdate: false, // Окно редактирования филиала
  windowConstructorSiteCreate: false, // Окно создания новго сайта конструктора
  windowConstructorSiteUpdate: false, // Окно редактиорвания сайта конструктора
  windowCreateBrand: false, // Окно создания нового бренда
  windowUpdateBrand: false, // Окно редактирования бренда
  windowCreateCategory: false, // Окно создания новой категории
  windowUpdateCategory: false, // Окно ретактирования категории
  windowCreateMalfunction: false, // Окно создания неисправности
  windowUpdateMalfunction: false, // Окно ретактирования неисправности
  windowImportDevice: false // Окно импорта устройств
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
  /** Установка токена в axios */
  setToken() {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    if (cookies['jwt-token']) {
      this.$axios.setToken(cookies['jwt-token'], 'Bearer')
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
  }
}

export const getters = {
  breadcrumbs: (state) => state.breadcrumbs
}
