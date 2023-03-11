const router = require("express").Router()
const { bookAppointment, checkBookingAvilability } = require("../controller/Appointment");
const auth = require("../middleware/auth");


router.post("/book-appointment", auth, bookAppointment);
router.post("/check-booking-avilability", auth, checkBookingAvilability);


module.exports = router