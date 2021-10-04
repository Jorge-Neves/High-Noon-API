const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")


const habitSchema = new Schema({
  name: {
    type: String,
    
  },
  successCount: {
    type: Number,
    default: 0,
  },
  missCount: {
    type: Number,
    default: 0,
  },
  successArrayIntegers: {
    type: Number,
    default: 0,
  },
  successrrayStrings: {
    type: Number,
    default: 0,
  },
  missArrayIntegers: {
    type: Number,
    default: 0,
  },
  missArrayStrings: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
},
{
timestamp:true
});

const Habit = model("Habit", habitSchema);

module.exports = Habit;