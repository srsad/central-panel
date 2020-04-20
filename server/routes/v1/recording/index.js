const { Router } = require('express')
// const routerForRecording = require('./forRecording.routs')
const routerNotRecording = require('./notRecording.routs')
const router = Router()

console.log('recording routs')

// /api/v1/recording
// router.use('/for', routerForRecording)
router.use('/not', routerNotRecording)

module.exports = router
