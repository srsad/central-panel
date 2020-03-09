const {
  create,
  update,
  remove,
  getAll,
  getById
} = require('../../controllers/role.controller')
const { Router } = require('express')
const router = Router()

// /api/v1/role
router.get('/getall', getAll)
router.get('/get/:id', getById)
router.post('/create', create)
router.post('/update/:id', update)
router.delete('/remove/:id', remove)

module.exports = router
