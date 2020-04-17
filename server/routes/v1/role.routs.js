const { Router } = require('express')
const router = Router()
const passport = require('passport')

const {
  create,
  update,
  remove,
  getAll,
  getById
} = require('../../controllers/role.controller')

// /api/v1/role
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)
router.get(
  '/get/:id',
  passport.authenticate('jwt', { session: false }),
  getById
)
router.post('/create', passport.authenticate('jwt', { session: false }), create)
router.post(
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
