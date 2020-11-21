const { Router } = require('express')
const webhookRouts = require('./webhook.routs')
const yandexRouts = require('./yandex.routs')
const router = Router()

// /api/v1/analytics/
router.use('/webhook', webhookRouts)
router.use('/yandex', yandexRouts)

module.exports = router
