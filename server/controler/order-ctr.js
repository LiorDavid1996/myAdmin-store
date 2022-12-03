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
    .insertMany({ ...req.body, createdAt: new Date().toISOString() })
    .then(() =>
      res.status(300).json({ success: true, massage: "order added succesfuly" })
    )
    .catch((error) => res.status(400).json({ success: false, error }));
};
const getByName = async (req, res) => {
  const coffe = [];
  await orderModel.find({}).then((result, error) => {
    result.name.filter((name) => {
      if (name == "coffe") {
        coffe.push(name);
      }
    });
  });
};

const getLestWeek = async (req, res) => {
  const week = {};

  for (let i = 1; i <= 7; i++) {
    const start = new Date();
    start.setDate(start.getDate() - i);
    const end = new Date();
    end.setDate(end.getDate() - i + 1);
    await orderModel
      .find({ createdAt: { $gte: start, $lt: end } })
      .count()
      .then((result, error) => {
        if (error) {
          return res.status(400).json({ success: false, message: error });
        }
        week[i] = { date: start.toString().slice(0, 10), result };
      });
  }
  return res.status(200).json({ success: true, message: week })
  
};

module.exports = { getOrder, createOrder, getLestWeek };
