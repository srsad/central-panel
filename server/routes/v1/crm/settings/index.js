const { Router } = require('express')
const routerStatus = require('./status.routs')
const router = Router()

// /api/v1/crm/settings
router.use('/status', routerStatus)

module.exports = router
