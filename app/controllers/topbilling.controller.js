const db = require("../models");
const Billing = db.topbillings;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
  ///////// where clause ///////////////
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  try {
    // console.log(page, size, limit)   sort: [Bill_Date, descending]
    records = await Billing.findAndCountAll({
      limit: 10,
      where: condition,
      order: [["Bill_Date", "DESC"]],
    });
    res
      .status(201)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e });
  }
};
