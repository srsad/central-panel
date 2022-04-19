const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getAll,
  getAllById
} = require('../../../controllers/repair/category.controller')
const router = Router()

// /api/v1/repair/category
/**
 * Создания категории
 * @group repairCategory - Категории (защищенные роуты)
 * @route POST /api/v1/repair/category/create
 * @summary Создания категории
 * @param {RepairCategory.model} body.body.required - новые данные
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.post('/create', passport.authenticate('jwt', { session: false }), create)

/**
 * Обновление категории
 * @group repairCategory - Категории (защищенные роуты)
 * @route POST /api/v1/repair/category/update
 * @summary Обновление категории
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
 * Удаление категории
 * @group repairCategory - Категории (защищенные роуты)
 * @route DELETE /api/v1/repair/category/remove/:id
 * @summary Удаление категории
 * @param {string} id.query.required - id удаляемого категории
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
 * Вывод категории по id
 * @group repairCategory - Категории (защищенные роуты)
 * @route GET /api/v1/repair/category/get/:id
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
 * @group repairCategory - Категории (защищенные роуты)
 * @route GET /api/v1/repair/category/getall/
 * @summary Вывод всех категорий
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)

/**
 * Вывод всех категорий бренда
 * @group repairCategory - Категории (защищенные роуты)
 * @route GET /api/v1/repair/category/getallbyid/:id
 * @summary Вывод всех категорий
 * @param {string} id.query.required - id удаляемого категории
 * @returns {object} 200 - При успешном выводе
 * @returns {Error} default - При возникновении ошибки
 * @security JWT
 */
router.get(
  '/getallbyid/:id',
  passport.authenticate('jwt', { session: false }),
  getAllById
)

module.exports = router
