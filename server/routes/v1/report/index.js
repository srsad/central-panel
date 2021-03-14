const { Router } = require('express')
const routerBrands = require('./brand.routs')
const routerSummory = require('./summory.routs')
const routerBranch = require('./branch.routs')
const routerSchedule = require('./schedule.routs')
const routerPlan = require('./plans.routs')
const managerPlan = require('./managerPlan.routs')
const router = Router()

// /api/v1/report
router.use('/brand', routerBrands)
router.use('/summory', routerSummory)
router.use('/branch', routerBranch)
router.use('/schedule', routerSchedule)
router.use('/plan', routerPlan)
router.use('/manager-plan', managerPlan)

module.exports = router
