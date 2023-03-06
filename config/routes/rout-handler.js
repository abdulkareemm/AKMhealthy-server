module.exports = (app) => {
  app.use("/api/user", require("../../routes/User"));
};
