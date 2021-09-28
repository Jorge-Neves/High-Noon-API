const { Schema, model } = require("mongoose");


const RandomEventsSchema = new Schema({
  name: {
    type: String,
    
  },
  description: String,
},
{timestamps:true});

const RandomEvent = model("RandomEvent", RandomEventsSchema);

module.exports = RandomEvent