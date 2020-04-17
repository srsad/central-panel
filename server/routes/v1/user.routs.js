const busboyBodyParser = require('busboy-body-parser')
const { Router } = require('express')
const router = Router()
const passport = require('passport')

const {
  create,
  update,
  remove,
  getAll,
  getById,
  switchStatus
} = require('../../controllers/user.controller')

// /api/v1/user
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)
router.get('/get/:id', getById)
router.post(
  '/create',
  // passport.authenticate('jwt', { session: false }),
  busboyBodyParser(),
  create
)
router.post(
  '/switch-active/:id',
  passport.authenticate('jwt', { session: false }),
  switchStatus
)
router.post(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  busboyBodyParser(),
  update
)
router.delete(
  '/remove/:id',
  passport.authenticate('jwt', { session: false }),
  remove
)

module.exports = router
