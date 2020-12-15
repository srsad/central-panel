const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getList
} = require('../../../controllers/report/plan.controller')
const router = Router()

/**
 * Создание плана
 * @group planReport - Отчеты, план (защищенные роуты)
 * @route POST /api/v1/report/plan/create
 * @summary Создание плана
 * @param {ReportPlans.model} body.body.required - новые данные
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
 * Обновление плана
 * @group planReport - Отчеты, план (защищенные роуты)
 * @route PUT /api/v1/report/plan/update/:id
 * @summary Обновление плана
 * @param {string} id.query.required - id обнвляемого плана
 * @param {ReportPlans.model} body.body.required - новые данные
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
 * Удаление плана
 * @group planReport - Отчеты, план (защищенные роуты)
 * @route DELETE /api/v1/report/plan/remove/:id
 * @summary Удаление плана
 * @param {string} id.query.required - id удаляемого плана
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
 * Вывод плана по id
 * @group planReport - Отчеты, план (защищенные роуты)
 * @route GET /api/v1/report/plan/get/:id
 * @summary Вывод плана по id
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
 * Вывод всех графиков по id
 * @group planReport - Отчеты, план (защищенные роуты)
 * @route GET /api/v1/report/plan/get-list/
 * @summary Вывод всех графиков по id
 * @param {PaginationParams.model} body.body - параметры вывода
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get(
  '/get-list',
  passport.authenticate('jwt', { session: false }),
  getList
)

module.exports = router

/**
 * Параметры постройчной навигации
 * @typedef PaginationParams - Параметры постройчной навигации
 * @property {string} limit - лимит
 * @property {string} offset - смещение 
 */
