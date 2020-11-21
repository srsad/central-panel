const { Router } = require('express')
const router = Router()
const passport = require('passport')

const {
  create,
  update,
  remove,
  getAllBrandsAndSites,
  getById,
  getBySiteUrl
} = require('../../../controllers/site/testimonial.controller')

// /api/v1/site/testimonial
router.get(
  '/get-brands-and-sites',
  passport.authenticate('jwt', { session: false }),
  getAllBrandsAndSites
)
router.get(
  '/bysiteurl/:siteurl',
  // passport.authenticate('jwt', { session: false }),
  getBySiteUrl
)
router.get(
  '/get/:id',
  passport.authenticate('jwt', { session: false }),
  getById
)
router.post('/create', create)
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
