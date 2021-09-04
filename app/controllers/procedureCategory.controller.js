const db = require("../models");
const ProcedureCategory = db.procedureCatagory;
const Op = db.Sequelize.Op;

// Create and Save a new DesignationCategory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "ProcedureCategory name or code can not be empty!",
    });
    return;
  }

  // Create a ProcedureCategory
  const procedurecategory = {
    name: req.body.name,
    code: req.body.code,
    status: req.body.status ? req.body.status : false,
  };


  // Save ProcedureCategory in the database
  ProcedureCategory.create(procedurecategory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the ProcedureCategory.",
      });
    });
};

// Retrieve all DesignationCategorys from the database.
exports.findAll = async (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  ///////// where clause ///////////////
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  try {
    records = await ProcedureCategory.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      raw: true,
    });
    res
      .status(200)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e.message });
  }
};

// Find a single ProcedureCategory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProcedureCategory.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ProcedureCategory with id=" + id,
      });
    });
};

// Update a ProcedureCategory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ProcedureCategory.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ProcedureCategory was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ProcedureCategory with id=${id}. Maybe ProcedureCategory was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ProcedureCategory with id=" + id,
      });
    });
};

// Delete a ProcedureCategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ProcedureCategory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ProcedureCategory was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ProcedureCategory with id=${id}. Maybe ProcedureCategory was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ProcedureCategory with id=" + id,
      });
    });
};

// Delete all ProcedureCategory from the database.
exports.deleteAll = (req, res) => {
  DesignationCategory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} ProcedureCategory were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all ProcedureCategory.",
      });
    });
};

// find all published DesignationCategory
exports.findAllActive = (req, res) => {
  DesignationCategory.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving ProcedureCategory.",
      });
    });
};
