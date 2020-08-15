const { Router } = require('express')
const { updSheet } = require('../../../controllers/report/sheets.controller')
const router = Router()

// /api/v1/report/sheets
router.get('/upd', updSheet)

module.exports = router
