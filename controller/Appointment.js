const Appointment = require("../models/Appoinment");
const UserModel = require("../models/User");
const moment = require("moment");

module.exports.bookAppointment = async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment.utc(req.body.date,"DD-MM-YYYY").toISOString()
    req.body.time = moment.utc(req.body.time, "HH:mm").toISOString();

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

module.exports.checkBookingAvilability = async (req, res) => {
  try {

    const date = moment.utc(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment.utc(req.body.time,"HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment.utc(req.body.time,"HH:mm")
      .add(1, "hours")
      .toISOString();

    const appointment = await Appointment.find({
      "$and": [
        {doctorId: req.body.doctorId},
        {date:date},
        {time:{$gte:fromTime,$lte:toTime}}
      ]
    });
    if (appointment.length > 0) {
      return res
        .status(200)
        .json({ msg: "Appointment not available", success: false });
    }
    res
      .status(200)
      .json({ msg: "You can book appointment", success: true });
  } catch (err) {
    console.log(err.message);
    return res
      .status(401)
      .json({ msg: "check book appointment failed", success: false });
  }
};
