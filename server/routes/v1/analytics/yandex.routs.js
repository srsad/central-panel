const { Router } = require('express')
const busboyBodyParser = require('busboy-body-parser')

const { createUser, remove, getAll } = require('../../../controllers/analytics/yandex.controller')
const router = Router()

// /api/v1/analytics/yandex
router.post('/user/create', createUser)
router.get('/getall', busboyBodyParser(), getAll)
router.delete('/remove/:id', busboyBodyParser(), remove)

module.exports = router
