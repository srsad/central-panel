const { Router } = require('express')
const routerBrands = require('./brand.routs')
const routerCategoty = require('./category.routs')
const routerDevices = require('./device.routs')
const routerMalfunctions = require('./malfunction.routs')
const router = Router()

// /api/v1/repair
router.use('/brand', routerBrands)
router.use('/category', routerCategoty)
router.use('/device', routerDevices)
router.use('/malfunction', routerMalfunctions)

module.exports = router
