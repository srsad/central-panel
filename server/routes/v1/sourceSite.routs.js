const busboyBodyParser = require('busboy-body-parser')

const {
  create,
  update,
  remove,
  getAll,
  getById
} = require('../../controllers/sourceSite.controller')
const { Router } = require('express')
const router = Router()

// /api/v1/source-site
router.get('/getall', getAll)
router.get('/get/:id', getById)
router.post('/create', busboyBodyParser(), create)
router.post('/update/:id', busboyBodyParser(), update)
router.delete('/remove/:id', remove)

module.exports = router
