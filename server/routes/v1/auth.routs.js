const { Router } = require('express')
const { login } = require('../../controllers/auth.controller')
const router = Router()

// /api/v1/auth
router.post('/login', login)
// router.post('/check', checkUser)

module.exports = router
