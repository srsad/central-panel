const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/report/branch.controller')
const router = Router()

// /api/v1/report/branch

/**
 * Создания филиала
 * @group branchesReport - Филиалы (защищенные роуты)
 * @route POST /api/v1/report/branch/create
 * @summary Создания филиала
 * @param {ReportBranches.model} body.body.required - новые данные
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
 * Обновление филиала
 * @group branchesReport - Филиалы (защищенные роуты)
 * @route PUT /api/v1/report/branch/update/:id
 * @summary Обновление филиала
 * @param {string} id.query.required - id обнвляемого филиала
 * @param {ReportBranches.model} body.body.required - новые данные
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
 * Удаление филфиала
 * @group branchesReport - Филиалы (защищенные роуты)
 * @route DELETE /api/v1/report/branch/remove/:id
 * @summary Удаление филфиала
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
 * Вывод всех филиала по id
 * @group branchesReport - Филиалы (защищенные роуты)
 * @route GET /api/v1/report/branch/get/:id
 * @summary Вывод всех филиала по id
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
 * Вывод всех филиалов
 * @group branchesReport - Филиалы (защищенные роуты)
 * @route GET /api/v1/report/branch/getall/
 * @summary Вывод всех филиалов
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
