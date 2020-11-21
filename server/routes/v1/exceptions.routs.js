const { Router } = require('express')
const router = Router()
const passport = require('passport')

const { getExceptions } = require('../../controllers/exceptions.controller')

// /api/v1/exceptions
router.get(
  '/getAll',
  passport.authenticate('jwt', { session: false }),
  getExceptions
)

module.exports = router
