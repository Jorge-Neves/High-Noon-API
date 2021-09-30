const router = require("express").Router();
const Task = require("../models/Task.Model");

router.get("/tasks", async (req, res, next) => {
  try {
    const response = await Task.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/tasks", async (req, res) => {
  const { name, timeSpent, user } = req.body;

  if (!name || !timeSpent || !user) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const response = await Task.create({ name, timeSpent, user });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res
      .status(200)
      .json({ message: `Task with id ${req.params.id} was deleted.` });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const response = await Task.findById(req.params.id);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  const { name, timeSpent} = req.body;
  if (!name || !timeSpent ) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  try {
    const response = await Task.findByIdAndUpdate(
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
