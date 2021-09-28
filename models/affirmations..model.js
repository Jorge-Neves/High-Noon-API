const { Schema, model } = require("mongoose");


const affirmationsSchema = new Schema({
  name: {
    type: String,
    
  },
  description: String,
},
{timestamps:true});

const Affirmation = model("Affirmattion", habitSchema);

module.exports = Affirmation;