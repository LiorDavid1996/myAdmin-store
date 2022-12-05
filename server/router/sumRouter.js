const router = require('express').Router()
const {createSum,getSum} = require('../controler/sumCtr')

router.get('/',getSum)
router.get('/saveData',createSum)


module.exports=router