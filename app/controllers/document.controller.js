const db = require("../models");
const Document = db.documents;
const Op = db.Sequelize.Op;

// multer

// Create and Save a new Document
exports.createOne = async (req, res) => {
  const record = {
    doctorId: req.body.doctorId,
    name: req.body.name,
    docTitle: req.body.docTitle,
    docValue: req.body.docValue,
    url: req.file.filename,
    status: req.body.status,
    isVerified: 0,
    verificationRemark: req.body.verificationRemark,
    // docFile: req.file.fieldname,
  };
  console.log(record, "AllDataforAddress");
  try {
    msg = await Document.create(record).catch((err) => {
      console.log(err.message);
    });
    res.status(201).send({ message: "ok" });
  } catch (error) {
    if (res.status === 500) {
    } else if (req.files === null) {
      return res.status(400).send({ message: "No File uploaded" });
    }
  }
};

// Create and Save a new Center
exports.createMany = async (req, res) => {
  if (req.fileValidationError) {
    res.send({ result: "fail", message: req.fileValidationError });
  }
  const record = {
    doctorId: req.body.doctorId,
    name: req.body.name,
    docTitle: req.body.docTitle,
    docValue: req.body.docValue,
    status: req.body.status,
    isVerified: 0,
    verificationRemark: req.body.verificationRemark,
    // docFile: req.file.fieldname,
  };
  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      let rec = { ...record, url: req.files[i].filename };
      try {
        msg = await Document.create(rec).catch((err) => {
          console.log(err.message);
        });
      } catch (error) {
        if (res.status === 500) {
          res.send({ message: "Invalid File" });
        } else if (req.files === null) {
          return res.status(400).send({ message: "No File uploaded" });
        }
      }
    }
  }
  res.status(201).send({ message: "Successfully Uploaded" });
};

exports.download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

// Retrieve all Documents from the database.
exports.findOne = async (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  ///////// where clause ///////////////
  const doctorId = req.params.id;
  var condition = doctorId ? { doctorId: { [Op.eq]: doctorId } } : 0;
  try {
    records = await Document.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
    });
    res
      .status(201)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e.message() });
  }
};

exports.list = async (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  ///////// where clause ///////////////
  const doctorId = req.body.doctorId;
  var condition = doctorId ? { doctorId: { [Op.eq]: doctorId } } : 0;
  try {
    records = await Document.findAndCountAll({ limit: limit, offset: offset });
    res
      .status(201)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e.message() });
  }
};

// Update a Document by the id in the request
exports.updateStatus = (req, res) => {
  const id = req.params.id;

  Center.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Center was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Center with id=${id}. Maybe Center was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Center with id=" + id,
      });
    });
};

// Delete a Center with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Center.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Center was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Center with id=${id}. Maybe Center was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Center with id=" + id,
      });
    });
};

// find all published Center
exports.findAllVerified = (req, res) => {
  Center.findAll({ where: { isVerified: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Documents.",
      });
    });
};
