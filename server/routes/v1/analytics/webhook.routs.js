const { Router } = require('express')
const { create, getAll } = require('../../../controllers/analytics/webhook.controller')
const router = Router()
const busboyBodyParser = require('busboy-body-parser')

// /api/v1/analytics/webhook/create/envybox
// /api/v1/analytics/webhook/
router.get('/create/:source', create) // ~alloka, ~envybox
router.post('/create/:source', busboyBodyParser(), create) // ~alloka, ~envybox
router.get('/getall', getAll)

module.exports = router
