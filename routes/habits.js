const router = require("express").Router();
const Habit = require("../models/Habit.Model");

router.get("/habits", async (req, res, next) => {
  try {
    const response = await Habit.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/habits", async (req, res) => {
  const { name, timeSpent, user } = req.body;

  if (!name || !timeSpent || !user) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const response = await Habit.create({ name, timeSpent, user });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/habits/:id", async (req, res) => {
  try {
    await Habit.findByIdAndRemove(req.params.id);
    res
      .status(200)
      .json({ message: `Habit with id ${req.params.id} was deleted.` });
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
  const { name, timeSpent} = req.body;
  if (!name || !timeSpent ) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  try {
    const response = await Habit.findByIdAndUpdate(
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