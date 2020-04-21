const { Router } = require('express')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/recording/forRecording.controller')
const router = Router()

// /api/v1/recording/for/
router.post('/create', create)
router.put('/update/:id', update)
router.delete('/remove/:id', remove)
router.get('/get/:id', getById)
router.get('/getAll', getAll)

module.exports = router
