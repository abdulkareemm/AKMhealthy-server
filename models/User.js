const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});
const UserModel = mongoose.model("Users",userSchema)

module.exports = UserModel