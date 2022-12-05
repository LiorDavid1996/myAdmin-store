const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const summary = new Schema({
  startDate:{type:Date},
  expiration: {type:Date},
  lastUpdated: {type:Date},
   sum: {type:Number},
  revenue: {type:Number},
  cities: {type:Object},
  refunds: {type:Number},
  allTimeDocument:{type:Boolean}
  
},{timestamps:true});  

module.exports = mongoose.model("summary", summary);
