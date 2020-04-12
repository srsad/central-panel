const {
  create,
  update,
  remove,
  check,
  getAll,
  getById
} = require('../../controllers/part.controller')

const { Router } = require('express')
const router = Router()

// /api/v1/part
router.get('/getall', getAll)
router.get('/get/:id', getById)
router.post('/check', check)
router.post('/create', create)
router.post('/update/:id', update)
router.delete('/remove/:id', remove)

module.exports = router
