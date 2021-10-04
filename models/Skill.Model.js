const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")


const skillSchema = new Schema({
  name: {
    type: String,
    
  },
  timeSpent: {
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

const Skill = model("Skill", skillSchema);

module.exports = Skill;