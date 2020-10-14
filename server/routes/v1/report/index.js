const { Router } = require('express')
const routerBrands = require('./brand.routs')
const routerSummory = require('./summory.routs')
// const routerSheets = require('./sheets.routs')
const router = Router()

// /api/v1/report
router.use('/brand', routerBrands)
router.use('/summory', routerSummory)
// router.use('/sheets', routerSheets)

module.exports = router
