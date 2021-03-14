const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getAll,
  getById
} = require('../../../controllers/report/managerPlan.controller')
const router = Router()

/**
 * Создание: отчеты план для менеджеров и инженеров
 * @group managerPlans - отчеты план для менеджеров и инженеров (защищенные роуты)
 * @route POST /api/v1/report/manager-plan/create
 * @summary Создание: отчеты план для менеджеров и инженеров
 * @param {ManagerPlans.model} body.body.required - новые данные
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
 * Обновление: отчеты план для менеджеров и инженеров
 * @group managerPlans - : отчеты план для менеджеров и инженеров (защищенные роуты)
 * @route PUT /api/v1/report/manager-plan/:id
 * @summary Обновление: отчеты план для менеджеров и инженеров
 * @param {string} _id.query.required - id обнвляемого плана
 * @param {ManagerPlans.model} body.body.required - новые данные
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
 * @group managerPlans - Отчеты, план (защищенные роуты)
 * @route DELETE /api/v1/report/manager-plan/:id
 * @summary Удаление плана
 * @param {string} _id.query.required - id удаляемого плана
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
 * @group managerPlans - Отчеты, план (защищенные роуты)
 * @route GET /api/v1/report/manager-plan/get/:id
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
 * Вывод всего
 * @group managerPlans - Отчеты, план (защищенные роуты)
 * @route GET /api/v1/report/manager-plan/getall/
 * @summary Вывод всего
 * @param {ManagerPlans.model} body.body - параметры вывода
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
