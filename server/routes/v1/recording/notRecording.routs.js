const { Router } = require('express')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/recording/notRecording.controller')
const router = Router()

// /api/v1/recording/not/
router.post('/create', create)
router.post('/update/:id', update)
router.delete('/remove/:id', remove)
router.get('/get/:id', getById)
router.get('/getall', getAll)

module.exports = router
