const { Router } = require('express')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/crm/typeDevice.controller')
const router = Router()

// /api/v1/crm/type-device
router.post('/create', create)
router.put('/update/:id', update)
router.delete('/remove/:id', remove)
router.get('/get/:id', getById)
router.get('/getall', getAll)

module.exports = router
