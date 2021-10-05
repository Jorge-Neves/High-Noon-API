const router = require("express").Router();
const Skill = require("../models/Skill.Model");

router.get("/skills", async (req, res, next) => {
  try {
    const response = await Skill.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/skills", async (req, res) => {
  const { name, timeSpent, user } = req.body;

  if (!name || !timeSpent || !user) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const response = await Skill.create({ name, timeSpent, user });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/skills/:id", async (req, res) => {
  try {
    await Skill.findByIdAndRemove(req.params.id);
    res
      .status(200)
      .json({ message: `Skill with id ${req.params.id} was deleted.` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/skills/:id/inc", async (req, res) => {
  try {
    await Skill.findByIdAndUpdate(req.params.id,  {
      $inc: { timeSpent: 1}
    });

    res
      .status(200)
      .json({ message: `Skill with id ${req.params.id}s timeSpent was incremented.` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/skills/:id/dec", async (req, res) => {
  try {
    await Skill.findByIdAndUpdate(req.params.id,  {
      $inc: { timeSpent: -1}
    });

    res
      .status(200)
      .json({ message: `Skill with id ${req.params.id}s timeSpent was decremented.` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/skills/:id", async (req, res) => {
  try {
    const response = await Skill.findById(req.params.id);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/skills/:id", async (req, res) => {
  const { name, timeSpent} = req.body;
  if (!name || !timeSpent ) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  try {
    const response = await Skill.findByIdAndUpdate(
      req.params.id,
      {
        name,
        timeSpent,

      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
