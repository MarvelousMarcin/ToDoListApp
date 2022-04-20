const mongoose = require("mongoose");

const UserScheme = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserScheme.methods.toJSON = function () {
  const userObj = this.toObject();
  delete userObj.password;
  delete userObj.createdAt;
  delete userObj.updatedAt;
  delete userObj.__v;

  return userObj;
};

UserScheme.statics.findByMail = async function (email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    return null;
  }
};

const User = mongoose.model("User", UserScheme);

module.exports = User;
