const { Router } = require('express')
const passport = require('passport')
const busboyBodyParser = require('busboy-body-parser')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/repair/brand.controller')
const router = Router()

// /api/v1/repair/brand
/**
 * Создания бренда
 * @group repairBrands - Бренды (защищенные роуты)
 * @route POST /api/v1/repair/brand/create
 * @summary Создания бренда
 * @param {RepairBrands.model} body.body.required - новые данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.post(
  '/create',
  busboyBodyParser(),
  passport.authenticate('jwt', { session: false }),
  create
)

/**
 * Обновление бренда
 * @group repairBrands - Бренды (защищенные роуты)
 * @route PUT /api/v1/repair/brand/update/:id
 * @summary Обновление бренда
 * @param {RepairBrands.model} body.body.required - новые данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.put(
  '/update/:id',
  busboyBodyParser(),
  passport.authenticate('jwt', { session: false }),
  update
)

/**
 * Удаление бренда
 * @group repairBrands - Бренды (защищенные роуты)
 * @route DELETE /api/v1/repair/brand/remove/:id
 * @summary Удаление бренда
 * @param {string} id.query.required - id удаляемого бренда
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
 * Вывод бренда по id
 * @group repairBrands - Бренды (защищенные роуты)
 * @route GET /api/v1/repair/brand/get/:id
 * @summary Вывод бренда по id
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
 * Вывод всех брендов
 * @group repairBrands - Бренды (защищенные роуты)
 * @route GET /api/v1/repair/brand/getall/
 * @summary Вывод всех брендов
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)

module.exports = router
