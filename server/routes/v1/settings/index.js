const { Router } = require('express')
const routerApiKey = require('./apikey.routs')
const routerCity = require('./city.router')
const router = Router()

// /api/v1/settings/
router.use('/api-key', routerApiKey)
router.use('/city', routerCity)

module.exports = router
