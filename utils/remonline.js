const axios = require('axios')
const Cookies = require('js-cookie')
/**
 * API для работы с remonline
 */

export default class Rem {
  constructor(apiKey) {
    if (!apiKey) return console.error('remonline - не передан apiKey')
    this.apiKey = apiKey
    // eslint-disable-next-line prettier/prettier
    this.proxy = process.env.REMONLINE_PROXY === 'true'
        ? 'https://cors-anywhere.herokuapp.com/'
        : ''
    this.limit = 2 // всего три попытки на повторный запрос, при неудачной попытке
  }

  /**
   * Список заказов
   */
  async getOrders(filter = '') {
    // order/?token=...&created_at[]=1597352400000&created_at[]=1597438799999&branches[]=26047
    try {
      const token = Cookies.get('rem-token')
      const res = await this.remonline('get', `order/?token=${token}&${filter}`)
      return { data: res.data.data, count: res.data.count }
    } catch (e) {
      console.error(
        'remonline - getOrders | не удалось получить список заказов'
      )
    }
  }

  /**
   * Список типов сервисов СЦ - Гарантия
   */
  async getTypes() {
    try {
      const token = Cookies.get('rem-token')
      const res = await this.remonline('get', `order/types/?token=${token}`)
      return { data: res.data.data, count: res.data.count }
    } catch (e) {
      console.error(
        'remonline - getTypes | не удалось получить список типов сервисов'
      )
    }
  }

  /**
   * Список статусов
   */
  async getStatuses() {
    try {
      const token = Cookies.get('rem-token')
      const res = await this.remonline('get', `statuses/?token=${token}`)
      return { data: res.data.data, count: res.data.count }
    } catch (e) {
      console.error(
        'remonline - getStatuses | не удалось получить список статусов'
      )
    }
  }

  /**
   * Локации - Список компаний
   */
  async getBranches() {
    try {
      const token = Cookies.get('rem-token')
      const res = await this.remonline('get', `branches/?token=${token}`)
      return { data: res.data.data, count: res.data.count }
    } catch (e) {
      console.error(
        'remonline - getBranches | не удалось получить список компаний'
      )
    }
  }

  /**
   * Авторизация - получаем токен | время жизни 10 минут
   */
  async setToken() {
    try {
      const res = await this.remonline(
        'post',
        `token/new?api_key=${this.apiKey}`
      )
      // токен на 9 минут, ставлю на минуту меньше реальной жизни
      Cookies.set('rem-token', res.data.token, { expires: 560 })
    } catch (e) {
      console.error('remonline - не удалось получить токен')
      return false
    }
  }

  /**
   * Список пользовательских полей
   */
  async getСustomFields() {
    try {
      const token = Cookies.get('rem-token')
      const res = await this.remonline(
        'get',
        `order/custom-fields/?token=${token}`
      )
      return { data: res.data.data, count: res.data.count }
    } catch (e) {
      console.error(
        'remonline - getСustomFields | не удалось получить список пользовательских полей'
      )
    }
  }

  /**
   * Формирование и отправка запроса
   * @param {*} type Тип запроса <post|get>
   * @param {*} url Ссылка
   */
  async remonline(type, url) {
    try {
      return await axios[type](`${this.proxy}https://api.remonline.ru/${url}`)
    } catch (e) {
      console.error(`remonline - не удалось выполнить запрос ${url}`)
      // пробуем обновить токен и сделать повторный запрос
      if (this.limit > 0) {
        setTimeout(async () => {
          await this.setToken()
          await this.remonline(type, url)
          --this.limit
        }, 5000)
      } else {
        this.limit = 3
      }
    }
  }
}
