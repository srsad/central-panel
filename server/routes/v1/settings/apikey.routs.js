const { Router } = require('express')
const {
  create,
  update,
  remove,
  getById,
  getAll
} = require('../../../controllers/apikey.controller')
const router = Router()

console.log('asdasd')

// /api/v1/settings/api-key
router.post('/create', create)
router.post('/update/:id', update)
router.delete('/remove/:id', remove)
router.get('/get/:id', getById)
router.get('/getall', getAll)

module.exports = router
