const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getAll,
  getAllByCategoryId
} = require('../../../controllers/repair/device.controller')
const router = Router()

// /api/v1/repair/device
/**
 * Создания устройства
 * @group repairCategory - Устройства (защищенные роуты)
 * @route POST /api/v1/repair/device/create
 * @summary Создания устройства
 * @param {RepairCategory.model} body.body.required - новые данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.post('/create', passport.authenticate('jwt', { session: false }), create)

/**
 * Обновление устройства
 * @group repairCategory - Устройства (защищенные роуты)
 * @route POST /api/v1/repair/device/update
 * @summary Обновление устройства
 * @param {RepairCategory.model} body.body.required - новые данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  update
)

/**
 * Удаление устройства
 * @group repairCategory - Устройства (защищенные роуты)
 * @route DELETE /api/v1/repair/device/remove/:id
 * @summary Удаление устройства
 * @param {string} id.query.required - id удаляемого устройства
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
 * Вывод устройства по id
 * @group repairCategory - Устройства (защищенные роуты)
 * @route GET /api/v1/repair/device/get/:id
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
 * Вывод всех категорий
 * @group repairCategory - Устройства (защищенные роуты)
 * @route GET /api/v1/repair/device/getall/
 * @summary Вывод всех категорий
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)

/**
 * Вывод всех категорий бренда
 * @group repairCategory - Устройства (защищенные роуты)
 * @route GET /api/v1/repair/device/getall-by-category-id/:id
 * @summary Вывод всех категорий
 * @param {string} id.query.required - id удаляемого устройства
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get(
  '/getall-by-category-id/:id',
  passport.authenticate('jwt', { session: false }),
  getAllByCategoryId
)

module.exports = router
