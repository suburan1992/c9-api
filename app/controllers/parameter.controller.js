const db = require("../models");
const Parameter = db.parameters;

const Op = db.Sequelize.Op;

// Create and Save a new Parameter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Parameter
  const parameter = {
    region_id: req.body.region,
    name: req.body.name,
    procedureId: req.body.procedureId,
    departmentId: req.body.departmentId,
    designationId: req.body.designationId,
    serviceCatagoryId: req.body.serviceCatagoryId,
    remark: req.body.remark,
    status: req.body.status ? req.body.status : 0,
  };

  // Save Parameter in the database
  Parameter.create(parameter)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Parameter.",
      });
    });
};

// Retrieve all Parameters from the database.
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  records = await Parameter.findAll({
    where: condition,
    // attributes: ["id","name"],
    include: [
      { model: db.procedures, attributes: ["name","id"] },
      { model: db.designations, attributes: ["name","id"] },
      { model: db.departments, attributes: ["name","id"] },
      { model: db.serviceCategory, attributes: ["name","id"] },
    ],
  })
    .then((records) => {
      res.send(records);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Parameters.",
      });
    });
};

// Find a single Parameter with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Parameter.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Parameter with id=" + id,
      });
    });
};

// Update a Parameter by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Parameter.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Parameter was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Parameter with id=${id}. Maybe Parameter was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Parameter with id=" + id,
      });
    });
};

// Delete a Parameter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Parameter.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Parameter was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Parameter with id=${id}. Maybe Parameter was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Parameter with id=" + id,
      });
    });
};

// find all published Parameter
exports.findAllPublished = (req, res) => {
  Parameter.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Parameters.",
      });
    });
};
