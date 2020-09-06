const { Router } = require('express')
const {
  create,
  update,
  remove,
  getById,
  getAll,
  updateMenuindex
} = require('../../../../controllers/crm/settings/status.controller')
const router = Router()

// /api/v1/crm/settings/status
router.post('/create', create)
router.put('/update/:id', update)
router.put('/update-menuindex', updateMenuindex)
router.delete('/remove/:id', remove)
router.get('/get/:id', getById)
router.get('/getall', getAll)

module.exports = router
