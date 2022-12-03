const router = require('express').Router()
const {getProduct,createProduct} = require('../controler/product-ctr')

router.get('/',getProduct)
router.post('/saveData',createProduct)


module.exports=router