const { Router } = require('express')
const router = Router()
const passport = require('passport')

const {
  create,
  remove,
  getById,
  getByFP,
  getAll
} = require('../../controllers/session.controller')

// /api/v1/session
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)
router.get('/get/:id', getById)
router.get('/getfp/:fp', getByFP)
router.post('/create', create)
router.delete(
  '/remove/:id',
  passport.authenticate('jwt', { session: false }),
  remove
)

module.exports = router
