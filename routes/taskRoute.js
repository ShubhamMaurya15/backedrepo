const express = require("express");
const authUser = require("../middleware/authuser");
const Task = require("../models/Task");
const User = require("../models/User");

const router = express.Router();

router.post("/addtask", authUser, async (req, res) => {
  try {
    const { text } = req.body;
    const task = await Task.create({ text, createdBy: req.userId });

    res.status(201).json({
      status: "success",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/mytask", authUser, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.userId });

    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.patch("/update-task/:id", authUser, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // console.log(task);

    res.status(200).json({
      status: "success",
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete("/delete/:id", authUser, async (req, res) => {
  try {
    // console.log(req.params.id);
    const task = await Task.findByIdAndDelete(req.params.id);
    // console.log(task);
    res.status(200).json({
      status: "success",
      body: task,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
