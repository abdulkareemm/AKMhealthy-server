const { isAdmin } = require("../middleware/is-admin");
const auth = require("../middleware/auth");
const { getUsers, getDoctors, changeDoctorStatus } = require("../controller/Admin");

const router = require("express").Router();

router.get("/get-users", auth, isAdmin, getUsers);
router.get("/get-doctors", auth, isAdmin, getDoctors);
router.post("/change-doctor-status", auth, isAdmin, changeDoctorStatus);



module.exports = router;
