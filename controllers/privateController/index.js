const User = require("../../Models/userSchema");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../config/generateToken");

/* admin get all user */
const getUser = async (_req, res) => {
  try {
    const allUserinfo = await User.find();
    res.send(allUserinfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUser,
};
