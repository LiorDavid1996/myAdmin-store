const router = require('express').Router()
const {getOrder,createOrder,getLestWeek} = require('../controler/order-ctr')

router.get('/',getOrder)
router.post('/createOrder',createOrder)
router.get('/getLestWeek',getLestWeek)

module.exports= router