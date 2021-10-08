const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")


const habitSchema = new Schema({
  name: {
    type: String,
    
  },
  date: [{
    type: String,
  }]
},
{
timestamp:true
});

const Habit = model("Habit", habitSchema);

module.exports = Habit;