const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  first_name: { type: String, required: true},
  last_name: {type: String , required:true},
  branch_number:{type:Number,required:true},  
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  picture: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
  },
  city:{
    type:String,
    require:true
  }
}


);
module.exports = mongoose.model("users", User)