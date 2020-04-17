const { Router } = require('express')
const router = Router()
const passport = require('passport')
const busboyBodyParser = require('busboy-body-parser')

const {
  create,
  update,
  remove,
  getAll,
  getById
} = require('../../controllers/sourceSite.controller')

// /api/v1/source-site
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)
router.get(
  '/get/:id',
  passport.authenticate('jwt', { session: false }),
  getById
)
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  busboyBodyParser(),
  create
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
