const { Schema, model } = require("mongoose");


const affirmationSchema = new Schema({
  name: {
    type: String,

},
},
{timestamps:true});

const Affirmation = model("Affirmattion", affirmationSchema);

module.exports = Affirmation;