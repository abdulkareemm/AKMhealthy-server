const UserModel = require("../models/User");

module.exports.isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    if (user.isAdmin) {
      req.body.user = user;
      next();
    } else {
      return res.status(401).json({ msg: "No Authorazations", success: false });
    }
  } catch (err) {
    return res.status(401).json({ msg: "Is admin failed", success: false });
  }
};
