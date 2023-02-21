const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const summary = new Schema({
  startDate:{type:Date},
  expiration: {type:Date},
  lastUpdated: {type:Date},
   sum: {type:Number},
  revenue: {type:Number},
  cities: {type:Object},
  days:{type:Object},
  refunds: {type:Number},
  allTimeSum:{type:Boolean},
  products:{type:Object},
  lastDoc:{type:String},
  dayIs:{type:Date}
},{timestamps:true});  

module.exports = mongoose.model("summary", summary);
