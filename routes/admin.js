//import ...
const express = require('express')
const router = express.Router()
const { authCheck } = require('../middlewares/authCheck')
// import controller
const { getOrderAdmin, changeOrderStatus } = require('../controllers/conadmin')

router.put('/admin/order-status', authCheck, changeOrderStatus)
router.get('/admin/orders', authCheck, getOrderAdmin)

module.exports = router
