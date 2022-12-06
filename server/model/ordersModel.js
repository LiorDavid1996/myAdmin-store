const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema({
  product: { type: Array, required: true},
  price: {type: Number , required:true},
  city:{type:String ,required:true},
  createdAt:{type:String,required:true},
  updatedAt:{type:String,required:true}
  
  
}


);
module.exports = mongoose.model("orders", order)