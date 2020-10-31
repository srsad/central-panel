const { Router } = require('express')
const { create, getAll } = require('../../../controllers/analytics/webhook.controller')
const router = Router()

// /api/v1/analytics/webhook/
// TODO временно доступен по /api/v1/webhook/
// ~alloka, ~envybox
// router.get('/create/:source', create)
// router.get('/getall', getAll)
router.get('/:source', create)

module.exports = router
