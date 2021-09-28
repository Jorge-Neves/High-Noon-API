const Project = require("../models/project.model");
const fileUpload = require("../config/cloudinary/cloudinary");
const router = require("express").Router();

router.get('/projects', async (req, res) => {
    try{
    const projects = await Project.find();
    res.status(200).json(projects);
    //This will return a Json file with an array with all my projects
    //Its good practice to send the consumer some http status  
    //http status codes
    } catch(e) {
        res.status(500).json({message: e.message})
    }

})

router.post('/projects', async (req, res) => {
    const { title, description, imageUrl } = req.body

if ( !title || !description || !imageUrl){
    res.status(400).json({ message: "missing fields"});
    return //(we return because we want the execution to stop or we could have an else)
}

try{
const response = await Project.create({title, description, imageUrl});
res.status(200).json(response);
} catch(e){
    res.status(500).json({message: e.message})
}
})

router.delete("/projects/:id", async (req, res) =>{
    try{
        await Project.findByIdAndRemove(req.params.id);
        res.status(200).json({message: `Project with id ${req.params.id} was deleted.`})
    }catch(e){
        res.status(500).json({message: e})
    }
}
)

router.get("/projects/:id", async (req, res) => {
    try{
        const response = await Project.findById(req.params.id);
        res.status(200).json(response);
    } catch(e){
        res.status(500).json({message: e.message})
    }
})


router.put("/projects/:id", async (req, res) => {
    const { title, description, imageUrl } = req.body
    if ( !title || !description || !imageUrl){
        res.status(400).json({ message: "missing fields"});
        return //(we return because we want the execution to stop or we could have an else)
    }
    try{
   const response = await Project.findByIdAndUpdate(req.params.id, {
        title,
        description,
        imageUrl,
    }, {new: true});
    // res.status(200).json({message: `Project with id ${req.params.id} was updated.`})
    res.status(200).json(response)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})


router.post("/upload", fileUpload.single("file"), (req, res) => {
    try {
        res.status(200).json({ fileUrl: req.file.path });
    } catch(e) {
        res.status(500).json({message: e.message })
    }
})

module.exports = router;