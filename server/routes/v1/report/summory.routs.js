const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/report/summoryReport.controller')
const router = Router()

// /api/v1/report/summory
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  create
)
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
router.get(
  '/get/:id',
  passport.authenticate('jwt', { session: false }),
  getById
)
router.get(
  '/getall',
  passport.authenticate('jwt', { session: false }),
  getAll
)

module.exports = router
