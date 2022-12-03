const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema({
  name: { type: Array, required: true},
  price: {type: Number , required:true},
  city:{type:String ,required:true},},
  {timestamps:true}


);
module.exports = mongoose.model("orders", order)