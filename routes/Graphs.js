const router = require("express").Router();
const Task = require("../models/Task.Model");
const User = require("../models/User.model");


router.get("/graphs", async (req, res, next) => {
  try {

    const response = await Task.find({user: req.session.currentUser});
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});


router.get("/graphs/names", async (req, res, next) => {
    try {
  
      const response = await Task.find({user: req.session.currentUser});
      res.status(200).json(response);

    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });


router.get("/graphs/time", async (req, res, next) => {
    try {
  
      const response = await Task.find({user: req.session.currentUser});
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });

module.exports = router;
