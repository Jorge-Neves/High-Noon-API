const router = require("express").Router();
const Task = require("../models/Task.Model");
const Habit = require("../models/Habit.Model");
const Skill = require("../models/Skill.Model")
const User = require("../models/User.model");


router.get("/t/graphs", async (req, res, next) => {
  try {

    const response = await Task.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


router.get("/graphs/names", async (req, res, next) => {
    try {
  
      const response = await Task.find();
      res.status(200).json(response);

    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });


router.get("/t/graphs/time", async (req, res, next) => {
    try {
  
      const response = await Task.find();
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });


  router.get("/s/graphs", async (req, res, next) => {
    try {
  
      const response = await Skill.find();
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
  
  
  router.get("/s/graphs/names", async (req, res, next) => {
      try {
    
        const response = await Skill.find();
        res.status(200).json(response);
  
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  
  
  router.get("/s/graphs/time", async (req, res, next) => {
      try {
    
        const response = await Skill.find();
        res.status(200).json(response);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });







  

module.exports = router;
