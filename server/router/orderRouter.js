const router = require('express').Router()
const {getOrder,createOrder,createManyOrder} = require('../controler/order-ctr')

router.get('/',getOrder)
router.post('/createOrder',createOrder)
router.get('/createManyOrder',createManyOrder)

module.exports= router  