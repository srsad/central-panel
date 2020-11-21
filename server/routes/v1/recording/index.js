const { Router } = require('express')
const routerForRecording = require('./forRecording.routs')
const routerNotRecording = require('./notRecording.routs')
const routerNotRecordingForDevice = require('./notRecordingForDevice.router')
const router = Router()

// /api/v1/recording
router.use('/for', routerForRecording)
router.use('/not', routerNotRecording)
router.use('/not-device', routerNotRecordingForDevice)

module.exports = router
