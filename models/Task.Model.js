const { Schema, model } = require("mongoose");
<<<<<<< HEAD
const mongoose = require("mongoose");
=======
const mongoose = require("mongoose")

>>>>>>> 30ff8133f779c9020caebd2919024ea6d0dc08e4

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