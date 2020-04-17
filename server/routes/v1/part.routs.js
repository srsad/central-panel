const { Router } = require('express')
const router = Router()
const passport = require('passport')

const {
  create,
  update,
  remove,
  check,
  getAll,
  getById
} = require('../../controllers/part.controller')

// /api/v1/part
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)
router.get(
  '/get/:id',
  passport.authenticate('jwt', { session: false }),
  getById
)
router.post('/check', passport.authenticate('jwt', { session: false }), check)
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
