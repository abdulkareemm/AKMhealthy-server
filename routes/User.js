const router = require("express").Router();
const {register, login, getUserInfoById} = require("../controller/User");
const auth = require("../middleware/auth");

router.post("/register",register);

router.post("/login",login);
router.post("/get-user-info",auth,getUserInfoById)


module.exports = router
