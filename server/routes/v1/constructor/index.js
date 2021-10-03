const { Router } = require('express')
const router = Router()
const passport = require('passport')
const routerSites = require('./site.routs')

// /api/v1/constructor
router.use('/site', passport.authenticate('jwt', { session: false }), routerSites)

module.exports = router
