const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

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
    user.password = "";

    res.status(201).json({
      token,
      msg: "Login successfully",
      success: true,
      user,
    });
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
    user.password = "";
    res.status(200).json({
      msg: "User found",
      success: true,
      user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Error getting user info", success: false });
  }
};
module.exports.applyDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctors",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).json({
      success: true,
      msg: "Doctor account applied successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error applying doctor account",
      success: false,
      err: err.message,
    });
  }
};
module.exports.markAllAsSeen = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId)
    user.seenNotifications.push(...user.unseenNotifications)
    user.unseenNotifications = []
    console.log(user.unseenNotifications);
    const updateUser = await User.findByIdAndUpdate(user._id,user,{new:true})
    updateUser.password = undefined
    console.log(updateUser.unseenNotifications);
    res.status(200).json({success:true,msg:"All notifications marked as seen",user:updateUser})
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error mark all notifications as seen ",
      success: false,
      err: err.message,
    });
  }
};

module.exports.deleteAllSeenNotifactions = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.seenNotifications=[]
    const updateUser = await User.findByIdAndUpdate(user._id, user,{new:true});
    updateUser.password = undefined;
    res
      .status(200)
      .json({
        success: true,
        msg: "All seen notifications are deleted",
        user: updateUser,
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "Error delete all seen notifications",
      success: false,
      err: err.message,
    });
  }
};


module.exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({status:"approved"});
    return res
      .status(200)
      .json({ success: true, msg: "Doctors fetched successfully", doctors });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ msg: "get doctors failed", success: false });
  }
};
