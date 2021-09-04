const db = require("../models");
// const Doctor = db.doctors;
const DoctorCommercial = db.doctorcommercials;
const User = db.users;
const Onboard = db.onboards;
const Op = db.Sequelize.Op;

const startedDate = new Date("2021-08-06 00:00:00");
const endDate = new Date("2021-08-26 00:00:00");

exports.findAll = async (req, res) => {
  ///////// where clause ///////////////
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  try {
    records = await DoctorCommercial.findAndCountAll();
    records1 = await User.findAndCountAll({
      where: { createdAt: { [Op.between]: [startedDate, endDate] } },
    });
    records2 = await Onboard.findAndCountAll({ where: condition });
    
    res.status(201).send({
      data: records.rows,
      data1: records1.rows,
      data2: records2.rows,
      total: records.count,
      message: "Success",
    });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e });
  }
};
