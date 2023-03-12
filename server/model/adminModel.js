const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
  name: { type: String, required: true},
  lastName: {type: String , required:true},
  code:{type:Number ,required:true},
  role:{type:String,required:true},  

}


);
module.exports = mongoose.model("Admins", Admin)