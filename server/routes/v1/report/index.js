const { Router } = require('express')
const routerBrands = require('./brand.routs')
const routerSummory = require('./summory.routs')
const router = Router()

// /api/v1/report
router.use('/brand', routerBrands)
router.use('/summory', routerSummory)

module.exports = router
