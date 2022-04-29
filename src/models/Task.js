const mongoose = require("mongoose");

const TaskScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "General",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", TaskScheme);

module.exports = Task;
