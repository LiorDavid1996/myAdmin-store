const summaryModel = require("../model/summary-Model");

const getSum = async (req, res) => {
    await summaryModel.find({}).then((result, err) => {
      
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
  

  
const createSum = async (req, res) => {
    await summaryModel
      .insertMany(req.body )
      .then(() =>
        res.status(300).json({ success: true, massage: "order added succesfuly" })
      )
      .catch((error) => res.status(400).json({ success: false, error }));
  };

  module.exports={createSum,getSum}