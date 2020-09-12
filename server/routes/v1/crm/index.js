const { Router } = require('express')
const routerStatus = require('./status.routs')
const routerTypeRequest = require('./typeRequest.routs')
// const routerSettings = require('./settings')
const router = Router()

// /api/v1/crm
router.use('/status', routerStatus)
router.use('/type-request', routerTypeRequest)

module.exports = router
