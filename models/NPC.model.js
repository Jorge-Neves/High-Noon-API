const { Schema, model } = require("mongoose");


const NPCsSchema = new Schema({
  name: {
    type: String,
    
  },
  description: String,
},
{timestamps:true});

const NPC = model("NPC", NPCsSchema);

module.exports = NPC