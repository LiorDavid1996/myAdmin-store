const productModel = require("../model/productModel");

const getProduct = async (req, res) => {
  await productModel.find({}).then((result, err) => {
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

const createProduct = async (req, res) => {
  await productModel
    .insertMany(req.body)
    .then(() =>
      res
        .status(300)
        .json({ success: true, massage: "Product added succesfuly" })
    )
    .catch((error) => res.status(400).json({ success: false, error }));
};
module.exports = { getProduct, createProduct };
