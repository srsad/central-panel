const { Router } = require('express')
const routerApiKey = require('./apikey.routs')
const router = Router()

// /api/v1/settings/
router.use('/api-key', routerApiKey)

module.exports = router
