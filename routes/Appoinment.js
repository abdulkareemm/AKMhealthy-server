const router = require("express").Router()
const { bookAppointment } = require("../controller/Appointment");
const auth = require("../middleware/auth");


router.post("/book-appointment", auth, bookAppointment);

module.exports = router