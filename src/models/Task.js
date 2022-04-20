const mongoose = require("mongoose");

const TaskScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = new mongoose.model("Task", TaskScheme);

module.exports = Task;
