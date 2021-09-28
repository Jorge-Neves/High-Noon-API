const { Schema, model } = require("mongoose");


const habitSchema = new Schema({
  name: {
    type: String,
    
  },
  description: String,
},
{timestamps:true});

const Habit = model("Habit", habitSchema);

module.exports = Habit;