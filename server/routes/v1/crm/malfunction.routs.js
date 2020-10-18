const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getAll,
  getById,
  getByName,
  getFirstItems
} = require('../../../controllers/crm/malfunction.controller')
const router = Router()

// /api/v1/crm/malfunction
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
router.get(
  '/getbyname/:query',
  passport.authenticate('jwt', { session: false }),
  getByName
)
router.get(
  '/getfirstitems/',
  passport.authenticate('jwt', { session: false }),
  getFirstItems
)

module.exports = router
