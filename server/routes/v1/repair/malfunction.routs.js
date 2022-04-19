const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/repair/malfunction.controller')
const router = Router()

// /api/v1/repair/malfunction
/**
 * Создание коллекции неисправностей
 * @group repairMalfunction - Коллекция неисправностей (защищенные роуты)
 * @route POST /api/v1/repair/malfunction/create
 * @summary Создание коллекции неисправностей
 * @param {RepairBrands.model} body.body.required - новые данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.post('/create', passport.authenticate('jwt', { session: false }), create)

/**
 * Обновление коллекции неисправностей
 * @group repairMalfunction - Коллекция неисправностей (защищенные роуты)
 * @route PUT /api/v1/repair/malfunction/update/:id
 * @summary Обновление коллекции неисправностей
 * @param {RepairBrands.model} body.body.required - новые данные
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
 * Удаление коллекции неисправностей
 * @group repairMalfunction - Коллекция неисправностей (защищенные роуты)
 * @route DELETE /api/v1/repair/malfunction/remove/:id
 * @summary Удаление коллекции неисправностей
 * @param {string} id.query.required - id удаляемого коллекции неисправностей
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
 * Вывод коллекции неисправностей по id
 * @group repairMalfunction - Коллекция неисправностей (защищенные роуты)
 * @route GET /api/v1/repair/malfunction/get/:id
 * @summary Вывод коллекции неисправностей по id
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
 * @group repairMalfunction - Коллекция неисправностей (защищенные роуты)
 * @route GET /api/v1/repair/malfunction/getall/
 * @summary Вывод всех брендов
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)

module.exports = router
