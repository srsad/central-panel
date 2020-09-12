const { Router } = require('express')
// const routerSettings = require('./settings')
const routerStatus = require('./status.routs')
const router = Router()

// /api/v1/crm
router.use('/status', routerStatus)

module.exports = router
