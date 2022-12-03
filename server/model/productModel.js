const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  name: { type: String, required: true},
  
},
{timestamps:true,}
);

module.exports = mongoose.model("products", product);
