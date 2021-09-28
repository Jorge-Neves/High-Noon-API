const { Schema, model } = require("mongoose");


const taskSchema = new Schema({
  name: {
    type: String,
    
  },
  description: String,
},
{
timestamp:true
});

const Task = model("Task", taskSchema);

module.exports = Task;