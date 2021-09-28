const mongoose= require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
});

const Project = mongoose.model("project", projectSchema);

module.exports = Project;