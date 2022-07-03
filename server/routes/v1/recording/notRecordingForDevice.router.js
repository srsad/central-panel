const { Router } = require('express')
const router = Router()
const passport = require('passport')

const {
  create,
  remove,
  getAll,
  getByBrand
} = require('../../../controllers/recording/notRecordingForDevice.controller')

// /api/v1/recording/not-device/
router.get('/getall', passport.authenticate('jwt', { session: false }), getAll)
router.get(
  '/get-by-brand/:brand',
  passport.authenticate('jwt', { session: false }),
  getByBrand
)
router.post('/create', passport.authenticate('jwt', { session: false }), create)
router.delete(
  '/remove/:id',
  passport.authenticate('jwt', { session: false }),
  remove
)

module.exports = router
