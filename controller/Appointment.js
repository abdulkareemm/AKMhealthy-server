const Appointment = require("../models/Appoinment");
const UserModel = require("../models/User");

module.exports.bookAppointment = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    const user = await UserModel.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.json({
      msg: "Appointment booked successfuly",
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    return res
      .status(401)
      .json({ msg: "book appointment failed", success: false });
  }
};
