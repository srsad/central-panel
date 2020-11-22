const { Router } = require('express')
const { create, getAll } = require('../../../controllers/analytics/webhook.controller')
const router = Router()
const busboyBodyParser = require('busboy-body-parser')

// /api/v1/analytics/webhook/

/**
 * Сохранение данных вебхука
 * например /api/v1/analytics/webhook/create/envybox
 * @group analyticsWebhook - Вебхуки (публичные роуты)
 * @route GET /api/v1/analytics/webhook/create/:hook_name
 * @summary Сохранение данных вебхука стороннего сервиса
 * @param {string} hook_name.query.required - наименование сервиса
 * @param {Array.<string>} body.body - модельдля сохранения данных вебхука
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 */
router.get('/create/:source', create) // ~alloka, ~envybox

/**
 * Сохранение данных вебхука
 * например /api/v1/analytics/webhook/create/envybox
 * @group analyticsWebhook - Вебхуки (публичные роуты)
 * @route POST /api/v1/analytics/webhook/create/:hook_name
 * @summary Сохранение данных вебхука стороннего сервиса
 * @param {string} hook_name.query.required - наименование сервиса
 * @param {Array.<string>} body.body - модельдля сохранения данных вебхука
 * @returns {object} 201 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 */
router.post('/create/:source', busboyBodyParser(), create) // ~alloka, ~envybox

/**
 * Вывод данных всех вебхуков
 * @group analyticsWebhook - Вебхуки (публичные роуты)
 * @route GET /api/v1/analytics/webhook/getall
 * @summary Вывод данных всех вебхуков
 * @returns {object} 200 - При успешном создании
 * @returns {Error} default - При возникновении ошибки
 */
router.get('/getall', getAll)

module.exports = router
