const router = require("express").Router();

/* GET home page */
router.get("/indexu", (req, res, next) => {
  res.render("index");
});

module.exports = router;
