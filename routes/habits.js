const router = require("express").Router();


router.get("/habits", async (req, res, next) => {
  try{
  res.status(200).json(response);
  } catch(e) { 
      res.status(500).json({message: e.message})
  }
});

module.exports = router;