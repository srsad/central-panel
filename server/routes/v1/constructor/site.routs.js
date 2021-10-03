const router = require('express').Router()
const {
  create,
  update,
  remove,
  getAll,
  getById
} = require('../../../controllers/constructor/site.controller')

/**
 * Создание нового сайта в конструкторе
 * @group constructorSites - список сайтов конструктора
 * @route POST /api/v1/constructor/site/create
 * @summary Создание нового сайта в конструкторе
 * @param {ConstructorSites.model} body.body.required - параметры
 * @returns {Object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.post('/create', create)

/**
 * Обновление данных сайта конструтора
 * @group constructorSites - Сайты конструктора (защищенные роуты)
 * @route PUT /api/v1/constructor/site/update/:id
 * @summary Обновление данных сайта конструтора
 * @param {String} id.query.required - id обнвляемого сайта
 * @param {ConstructorSites.model} body.body.required - новые данные
 * @returns {Object} 200 - При успешном обновлении
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
 router.put('/update/:id', update)

/**
 * Удаление сайта конструктора
 * @group constructorSites - Сайты конструктора (защищенные роуты)
 * @route DELETE /api/v1/constructor/site/remove/:id
 * @summary Удаление сайта конструктора
 * @param {String} id.query.required - id удаляемого сайта
 * @returns {Object} 200 - При успешном удалении
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
 router.delete('/remove/:id', remove)

/**
 * Вывод сайта конструктора по id
 * @group constructorSites - Сайты конструктора (защищенные роуты)
 * @route GET /api/v1/constructor/site/get/:id
 * @summary Вывод сайта конструктора по id
 * @returns {Object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
 router.get('/get/:id', getById)

 /**
 * Вывод всех сайтов конструктора
 * @group constructorSites - Сайты конструктора (защищенные роуты)
 * @route GET /api/v1/constructor/site/getall/
 * @summary Вывод всех сайтов конструктора
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get('/getall', getAll)

module.exports = router
