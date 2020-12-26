const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getByBrandId,
  getAll
} = require('../../../controllers/report/schedule.controller')
const router = Router()

// /api/v1/report/schedule

/**
 * Создание графика
 * @group scheduleReport - Отчеты, график работ (защищенные роуты)
 * @route POST /api/v1/report/schedule/create
 * @summary Создание графика
 * @param {ReportSchedule.model} body.body.required - новые данные
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
 * Обновление графика
 * @group scheduleReport - Отчеты, график работ (защищенные роуты)
 * @route PUT /api/v1/report/schedule/update/:id
 * @summary Обновление графика
 * @param {string} id.query.required - id обнвляемого графика
 * @param {ReportSchedule.model} body.body.required - новые данные
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
 * Удаление графика
 * @group scheduleReport - Отчеты, график работ (защищенные роуты)
 * @route DELETE /api/v1/report/schedule/remove/:id
 * @summary Удаление графика
 * @param {string} id.query.required - id удаляемого графика
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
 * Вывод графика по id
 * @group scheduleReport - Отчеты, график работ (защищенные роуты)
 * @route GET /api/v1/report/schedule/get/:id
 * @summary Вывод графика по id
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
 * Вывод всех графиков
 * @group scheduleReport - Отчеты, график работ (защищенные роуты)
 * @route GET /api/v1/report/schedule/getall/
 * @summary Вывод всех графиков
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get(
  '/getall',
  passport.authenticate('jwt', { session: false }),
  getAll
)

/**
 * Вывод всех графиков по id бренда
 * @group scheduleReport - Отчеты, график работ (защищенные роуты)
 * @route GET /api/v1/report/schedule/get-by-brand/:id
 * @summary Вывод всех графиков по id
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get(
  '/get-by-brand/:id',
  passport.authenticate('jwt', { session: false }),
  getByBrandId
)

module.exports = router
