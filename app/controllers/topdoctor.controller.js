const db = require("../models");
const Doctor = db.topdoctors;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
  ///////// where clause ///////////////
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  try {
    // console.log(page, size, limit)   sort: [Bill_Date, descending]
    records = await Doctor.findAndCountAll({
      limit: 10,
      where: condition 
    });
    res
      .status(201)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e });
  }
};
