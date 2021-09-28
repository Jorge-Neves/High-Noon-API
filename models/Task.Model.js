const { Schema, model } = require("mongoose");


const taskSchema = new Schema({
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

const Task = model("Task", taskSchema);

module.exports = Task;