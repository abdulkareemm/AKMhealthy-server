const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  doctorInfo: {
    type: Object,
    required: true,
  },
  userInfo: {
    type: Object,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
},{timestamps:true});

const AppointmentModel = new mongoose.model("Appointments", appointmentSchema);

module.exports = AppointmentModel;
