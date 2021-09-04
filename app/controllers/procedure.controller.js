const db = require("../models");
const Procedure = db.procedures;
const Op = db.Sequelize.Op;

// Create and Save a new Procedure
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Procedure
  const procedure = {
    region_id: req.body.region,
    name: req.body.name,
    platinumPrice: req.body.platinumPrice,
    // pid: req.body.pid,
    commercial: req.body.commercial,
    domain: req.body.domain,
    remark: req.body.remark,
    status: req.body.status ? req.body.status : 0,
  };

  // Save Procedure in the database
  Procedure.create(procedure)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Procedure.",
      });
    });
};

// Retrieve all Procedures from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Procedure.findAll({
    where: condition,

    include: [
      { model: db.procedureCatagory, attributes: ["name", "id"] },
      { model: db.commercialcategories, attributes: ["name", "id"] },
      { model: db.domaincategories, attributes: ["name", "id"] },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Procedures.",
      });
    });
};

// Find a single Procedure with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Procedure.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Procedure with id=" + id,
      });
    });
};

// Update a Procedure by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Procedure.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Procedure was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Procedure with id=${id}. Maybe Procedure was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Procedure with id=" + id,
      });
    });
};

// Delete a Procedure with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Procedure.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Procedure was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Procedure with id=${id}. Maybe Procedure was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Procedure with id=" + id,
      });
    });
};

// find all published Procedure
exports.findAllPublished = (req, res) => {
  Procedure.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Procedures.",
      });
    });
};
