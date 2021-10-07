  const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")


const skillActivitySchema = new Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Task" 
  },
  timeSpent: {
    type: Number,
    default: 1,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
},
{
timestamp:true
});

const SkillActivity = model("SkillActivity", skillActivitySchema);

module.exports = SkillActivity;