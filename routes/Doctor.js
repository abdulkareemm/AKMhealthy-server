const router = require("express").Router()
const { getDoctorInfoById, updateDoctorInfo } = require("../controller/Doctor");
const auth = require("../middleware/auth");



router.get("/get-doctor-info-by-user-id/:id",auth,getDoctorInfoById)
router.post("/update-doctor-info/:id", auth, updateDoctorInfo);



module.exports = router