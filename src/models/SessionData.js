const mongoose = require("mongoose");

const SessionDataScheme = mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: "Session",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

SessionDataScheme.methods.toJSON = function () {
  const sessObj = this.toObject();

  delete sessObj.completed;
  delete sessObj.user;
  delete sessObj.__v;

  return sessObj;
};

const SessionData = mongoose.model("SessionData", SessionDataScheme);
module.exports = SessionData;
