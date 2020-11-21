const { Router } = require('express')
const passport = require('passport')
const {
  create,
  update,
  remove,
  getById,
  getAll,
  getВуDeviceType,
  getFirstItems
} = require('../../../controllers/crm/typeDevice.controller')
const router = Router()

// /api/v1/crm/type-device
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
  '/getbydevicetype/:query',
  passport.authenticate('jwt', { session: false }),
  getВуDeviceType
)

router.get(
  '/getfirstitems/',
  passport.authenticate('jwt', { session: false }),
  getFirstItems
)

module.exports = router
