const { Router } = require('express')
const webhookStatus = require('./webhook.routs')
const router = Router()

// /api/v1/analytics/
router.use('/webhook', webhookStatus)

module.exports = router
