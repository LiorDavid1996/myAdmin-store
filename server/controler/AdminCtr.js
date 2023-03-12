const createUser = async (req, res) => {
    await orderModel
      .insertMany(req.body)
      .then(() =>
        res.status(300).json({ success: true, massage: "user added succesfuly" })
      )
      .catch((error) => res.status(400).json({ success: false, error }));
  };

module.exports = { createUser };
