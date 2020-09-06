const { Router } = require('express')
const routerSettings = require('./settings')
const router = Router()

// /api/v1/crm
router.use('/settings', routerSettings)

module.exports = router
