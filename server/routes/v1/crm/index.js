const { Router } = require('express')
const routerStatus = require('./status.routs')
const routerTypeRequest = require('./typeRequest.routs')
const routerTypeDevice = require('./typeDevice.routs')
const routerClients = require('./client.routs')
const routerMalfunctions = require('./malfunction.routs')
const router = Router()

// /api/v1/crm
router.use('/status', routerStatus)
router.use('/type-request', routerTypeRequest)
router.use('/type-device', routerTypeDevice)
router.use('/clients', routerClients)
router.use('/malfunction', routerMalfunctions)

module.exports = router
