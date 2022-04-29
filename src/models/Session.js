const mongoose = require("mongoose");

const SessionScheme = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

SessionScheme.methods.toJSON = function () {
  const sessionObj = this.toObject();
  delete sessionObj.__v;
  delete sessionObj._id;
  delete sessionObj.user;

  return sessionObj;
};

const Session = mongoose.model("Session", SessionScheme);

module.exports = Session;
