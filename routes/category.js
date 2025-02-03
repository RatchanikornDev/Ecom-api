const express = require('express')
const router = express.Router()
const { create, list, remove } = require('../controllers/concategory')
const { authCheck,adminCheck } =require('../middlewares/authCheck')

// @ENDPOINT http://localhost:5500/api/category
router.post('/category', authCheck,adminCheck,create)
router.get('/category',list)
router.delete('/category/:id', authCheck,adminCheck,remove)





module.exports = router