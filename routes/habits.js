const router = require("express").Router();
const Habit = require("../models/Habit.Model");

router.get("/habits", async (req, res, next) => {
  try{
    const response = await Habit.find();
  res.status(200).json(response);
  } catch(e) { 
      res.status(500).json({message: e.message})
  }
});

router.post("/habits", async (req, res) => {
  const { name} = req.body;

  if (!name) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const response = await Habit.create({ name});
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



router.get("/habits/:id", async (req, res) => {
  try {
    const response = await Habit.findById(req.params.id);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/habits/:id", async (req, res) => {
  const { name, date} = req.body;
  if (!name || !date ) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  try {
    const response = await Task.findByIdAndUpdate(
      req.params.id,
      {
        name,
        date,

      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


router.put("/habits/:id/success/", async (req, res) => {
  let today = new Date();
  
  function Usabledate() {
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = dd+mm+yyyy;
    
    
    return today 
    }
    
    Usabledate()
  try {
    
    const response = await Habit.findByIdAndUpdate(req.params.id, {
      $push: { date: today }
    });
    res.status(200).json(response);

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


router.put("/habits/:id/miss/", async (req, res) => {
  let today = new Date();
  
  function Usabledate() {
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = dd+mm+yyyy;
    
    
    return today 
    }
    
    Usabledate()
  try {

    const response = await Habit.findByIdAndUpdate(req.params.id, {
        $pull: { date : today }
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



module.exports = router;