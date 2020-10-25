const { Router } = require('express')
const routerTestimonial = require('./testimonial.routs')
const router = Router()

// /api/v1/site/
router.use('/testimonial', routerTestimonial)

module.exports = router
