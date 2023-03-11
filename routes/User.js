const router = require("express").Router();
const {
  register,
  login,
  getUserInfoById,
  applyDoctor,
  markAllAsSeen,
  deleteAllSeenNotifactions,
  getDoctors,
} = require("../controller/User");
const auth = require("../middleware/auth");

router.post("/register", register);

router.post("/login", login);
router.post("/get-user-info", auth, getUserInfoById);
router.post("/apply-doctor", auth, applyDoctor);
router.post("/mark-all-notifications-as-seen", auth, markAllAsSeen);
router.post("/delete-all-notifications", auth, deleteAllSeenNotifactions);
router.get("/get-doctors", auth, getDoctors);


module.exports = router;
