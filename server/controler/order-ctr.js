const orderModel = require("../model/ordersModel");

const getOrder = async (req, res) => {
  await orderModel.find({}).then((result, err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }
    if (result.length == 0) {
      return res.json({ success: false, message: "no data" });
    }
    if (result) {
      return res.status(200).json({ success: true, message: result });
    }
  });
};

const createOrder = async (req, res) => {
  await orderModel
    .insertMany(req.body )
    .then(() =>
      res.status(300).json({ success: true, massage: "order added succesfuly" })
    )
    .catch((error) => res.status(400).json({ success: false, error }));
};
const createManyOrder = async () =>{
  const products = [['coffee',10],['tea',7],['pizza',40],['burger',40],['sushi',19],['engera',50]]
    const cityArr=  ['nethanya','rehovot','lod','telAviv','azor','holon']
    for (let index = 60; index > 1  ;index--) {
      let product=[],price=0,orCity=cityArr[Math.floor(60/(index+1))]
      for (let j = 0; j < Math.floor(Math.random()*5); j++) {
        let i=Math.floor((Math.random()*4))
        product.push(products[i][0])
        price+=products[i][1]
        city=cityArr[i]
        console.log(i);
      }
      const obj={
        city:city,
        price:price,
        product:product,
        createdAt:new Date(new Date().setDate(-(Math.floor(60/(index+1))))),
        updatedAt:new Date(new Date().setDate(-(Math.floor(60/(index+1)))))
      }
      await orderModel.insertMany(obj)
    }

}




module.exports = { getOrder, createOrder, createManyOrder};
