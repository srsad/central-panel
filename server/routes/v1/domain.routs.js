const { Router } = require('express')
const router = Router()
const passport = require('passport')

const {
  create,
  update,
  remove,
  getAll,
  getById,
  getByAddress
} = require('../../controllers/domain.controller')

// /api/v1/domain
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)
router.get(
  '/byaddress/:address',
  passport.authenticate('jwt', { session: false }),
  getByAddress
)
router.get(
  '/get/:id',
  passport.authenticate('jwt', { session: false }),
  getById
)
router.post('/create', passport.authenticate('jwt', { session: false }), create)
router.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  update
)
router.delete(
  '/remove/:id',
  passport.authenticate('jwt', { session: false }),
  remove
)

module.exports = router
