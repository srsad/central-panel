const {
  create,
  update,
  remove,
  getAll,
  getById
} = require('../../controllers/domain.controller')

const { Router } = require('express')
const router = Router()

// /api/v1/domain
router.get('/getall', getAll)
router.get('/get/:id', getById)
router.post('/create', create)
// TODO зменить все update post => put
router.post('/update/:id', update)
router.delete('/remove/:id', remove)

module.exports = router
