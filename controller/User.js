const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.find({ email: email });
  try {
    if (user.length > 0) {
      return res.json({ msg: "You already have an account!", success: false });
    }
    const slat = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, slat);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    res
      .status(201)
      .json({ user: newUser, msg: "user created successfully", success: true });
  } catch (err) {
    res.status(500).json({ msg: err.message, success: false });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  try {
    if (!user) {
      return res
        .status(201)
        .json({ msg: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(201)
        .json({ msg: "Password is incorrect", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .json({ token, msg: "Login successfully", success: true, user });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error logging in", success: false, err: err.message });
  }
};

module.exports.getUserInfoById = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(200)
        .json({ msg: "User does not exite", success: false });
    }
    res.status(200).json({
      msg: "User found",
      success:true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error getting user info", success: false });
  }
};
