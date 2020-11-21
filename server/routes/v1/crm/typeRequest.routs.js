const { Router } = require('express')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/crm/typeRequest.controller')
const router = Router()

// /api/v1/crm/type-request
router.post('/create', create)
router.put('/update/:id', update)
router.delete('/remove/:id', remove)
router.get('/get/:id', getById)
router.get('/getall', getAll)

module.exports = router
