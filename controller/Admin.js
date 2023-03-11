const DoctorModel = require("../models/Doctor");
const UserModel = require("../models/User");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ isAdmin: false });
    res
      .status(200)
      .json({ success: true, msg: "Users fetched successfully", users });
  } catch (err) {
    return res.status(401).json({ msg: "get user failed", success: false });
  }
};
module.exports.getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    return res
      .status(200)
      .json({ success: true, msg: "Doctors fetched successfully", doctors });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ msg: "get doctors failed", success: false });
  }
};

module.exports.changeDoctorStatus = async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(
      req.body.doctorId,
      { status: req.body.status },
      { new: true }
    );
   
    const user = await UserModel.findOne({ _id: doctor.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request-changed",
      message: `Your doctor account has been ${doctor.status}`,
      onClickPath: "/notifications",
    });
    const doctors = await DoctorModel.find()
    await user.save();
     res.status(200).json({
       success: true,
       msg: "Doctor status updated successfully ",
       doctors,
     });
  } catch (err) {
    return res.status(401).json({ msg: "get doctors failed", success: false });
  }
};
