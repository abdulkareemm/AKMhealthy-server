module.exports = (app) => {
  app.use("/api/user", require("../../routes/User"));
  app.use("/api/admin",require("../../routes/Admin"))
  app.use("/api/doctor", require("../../routes/Doctor"));
  app.use("/api/appointment", require("../../routes/Appoinment"));


};
