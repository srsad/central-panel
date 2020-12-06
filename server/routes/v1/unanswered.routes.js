const { Router } = require('express')
const router = Router()
const passport = require('passport')

const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../controllers/unanswered.controller')

/**
 * Создание записи (неотвеченный вызов)
 * @group unanswerd - неотвеченные вызовы
 * @route POST /api/v1/unanswered/create
 * @summary Создание записи
 * @param {Unanswerd.model} body.body.required - данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 */
router.post('/create', create)

/**
 * Создание записи (неотвеченный вызов)
 * @group unanswerd - неотвеченные вызовы
 * @route GET /api/v1/unanswered/create
 * @summary Создание записи
 * @param {Unanswerd.model} body.body.required - данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 */
router.get('/create', create)

/**
 * Обновление записи (неотвеченный вызов)
 * @group unanswerd - неотвеченные вызовы
 * @route PUT /api/v1/unanswered/update/:id
 * @summary Обновление записи
 * @param {string} id.query.required - id обнвляемого филиала
 * @param {Unanswerd.model} body.body.required - новые данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.post(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  update
)

/**
 * Удаление записи (неотвеченный вызов)
 * @group unanswerd - неотвеченные вызовы
 * @route DELETE /api/v1/unanswered/remove/:id
 * @summary Удаление записи
 * @param {string} id.query.required - id удаляемого филфиала
 * @returns {object} 200 - При успешном удалении
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.delete(
  '/remove/:id',
  passport.authenticate('jwt', { session: false }),
  remove
)

/**
 * Вывод запись по id (неотвеченный вызов)
 * @group unanswerd - неотвеченные вызовы
 * @route GET /api/v1/unanswered/get/:id
 * @summary Вывод запись по id
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get(
  '/get/:id',
  passport.authenticate('jwt', { session: false }),
  getById
)

/**
 * Вывод всех записей (неотвеченный вызов)
 * @group unanswerd - неотвеченные вызовы
 * @route GET /api/v1/unanswered/getall/
 * @summary Вывод всех записей
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)

module.exports = router
