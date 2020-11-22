const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/report/summoryReport.controller')
const router = Router()

// /api/v1/report/summory

/**
 * Создания отчета
 * @group summoryReport - Отчеты, сводная таблица (защищенные роуты)
 * @route POST /api/v1/report/summory/create
 * @summary Создания отчета
 * @param {ReportSummory.model} body.body.required - Сводная таблица с отчетами
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  create
)

/**
 * Обновление отчета
 * @group summoryReport - Отчеты, сводная таблица (защищенные роуты)
 * @route PUT /api/v1/report/summory/update/:id
 * @summary Обновление отчета
 * @param {string} id.query.required - id обнвляемого отчета
 * @param {ReportSummory.model} body.body.required - новые данные
 * @returns {object} 200 - При успешном обновлении
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  update
)

/**
 * Удаление отчета
 * @group summoryReport - Отчеты, сводная таблица (защищенные роуты)
 * @route DELETE /api/v1/report/summory/remove/:id
 * @summary Удаление отчета
 * @param {string} id.query.required - id удаляемого отчета
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
 * Вывод отчета по id
 * @group summoryReport - Отчеты (защищенные роуты)
 * @route GET /api/v1/report/summory/get/:id
 * @summary Вывод отчета по id
 * @param {string} id.query.required - id возвращаемого отчета
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
 * Вывод всех отчетов
 * @group summoryReport - Отчеты (защищенные роуты)
 * @route GET /api/v1/report/summory/getall/
 * @summary Вывод всех отчетов
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get(
  '/getall',
  passport.authenticate('jwt', { session: false }),
  getAll
)

module.exports = router
