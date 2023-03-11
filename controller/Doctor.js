const DoctorModel = require("../models/Doctor");

module.exports.getDoctorInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await DoctorModel.findById(id)
    res.status(200).json({
      success: true,
      msg: "Doctor info fetched successfuly",
      doctor: doctor,
    });
  } catch (err) {
    console.log("err");
    res
      .status(500)
      .json({ msg: "Error get doctor info byid", success: false });
  }
};

module.exports.updateDoctorInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await DoctorModel.findOneAndUpdate(
      { userId: id },
      { ...req.body.values },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: "Doctor info updated successfuly",
      doctor,
    });
  } catch (err) {
    res
      .status(5000)
      .json({ msg: "Error get doctor info byid", success: false });
  }
};
