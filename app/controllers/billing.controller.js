const db = require("../models");
const Billing = db.billings;
const Op = db.Sequelize.Op;
const startedDate = new Date("2021-06-01 00:00:00");
const endDate = new Date("2021-06-26 00:00:00");

const startedDate1 = new Date("2021-05-01 00:00:00");
const endDate1 = new Date("2021-05-26 00:00:00");

const startedDate2 = new Date("2021-07-01 00:00:00");
const endDate2 = new Date("2021-07-26 00:00:00");

// Create and Save a new Billing
exports.create = async (req, res) => {
  // Validate request
  //   if (!req.body.name) {
  //     res.status(400).send({
  //       message: "Content can not be empty!",
  //     });
  //     return;
  //   }
  // Create a Billing

  const mpi = req.body.MPI.replace("'", "");
  const billing = {
    MPI: mpi,
    Patient_Name: req.body.Patient_Name,
    Bill_No: req.body.Bill_No,

    Bill_Date: req.body.Bill_Date,
    Bill_Amt: req.body.Bill_Amt,
    Contra_Disc_Name: req.body.Contra_Disc_Name,
    Contra_Disc_Amount: req.body.Contra_Disc_Amount,
    Mangment_Disc_Name: req.body.Mangment_Disc_Name,
    Mangment_Disc_Amount: req.body.Mangment_Disc_Amount
      ? req.body.Mangment_Disc_Amount
      : 0,
    Proff_Disc_Amount: req.body.Proff_Disc_Amount,
    Proff_Disc_Name: req.body.Proff_Disc_Name,
    Category: req.body.Category,
    User_Name: req.body.User_Name,
  };
  console.log(billing, "billingReport");
  await Billing.create(billing)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Billing.",
      });
    });
};

//Retrive All Data
exports.findAll = async (req, res) => {
  ///////// where clause ///////////////
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  try {
    // console.log(page, size, limit)
    records = await Billing.findAndCountAll({ where: condition });
    records1 = await Billing.findAndCountAll({
      where: {
        Bill_Date: {
          [Op.between]: [startedDate, endDate],
        },
      },
      // group: [db.Sequelize.fn('date_trunc', 'month', db.Sequelize.col('Bill_Date'))]
    });

    records2 = await Billing.findAndCountAll({
      where: {
        Bill_Date: {
          [Op.between]: [startedDate1, endDate1],
        },
      },
      // group: [db.Sequelize.fn('date_trunc', 'month', db.Sequelize.col('Bill_Date'))]
    });

    records3 = await Billing.findAndCountAll({
      where: {
        Bill_Date: {
          [Op.between]: [startedDate2, endDate2],
        },
      },
      // group: [db.Sequelize.fn('date_trunc', 'month', db.Sequelize.col('Bill_Date'))]
    });

    res.status(201).send({
      data: records.rows,
      data1: records1.count,
      data2: records2.count,
      data3: records3.count,
      total: records.count,
      message: "Success",
    });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e });
  }
};

// Delete a Billing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Billing.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Billing was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Billing with id=${id}. Maybe Billing was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Billing with id=" + id,
      });
    });
};
