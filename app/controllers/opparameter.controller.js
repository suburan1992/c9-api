const db = require("../models");
const OPParameter = db.opparameters;
const Op = db.Sequelize.Op;

// Create and Save a new OPParameter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a OPParameter
  const opparameter = {
    region_id: req.body.region,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status ? req.body.status : 0
  };

  // Save OPParameter in the database
  OPParameter.create(opparameter)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the OPParameter."
      });
    });
};

// Retrieve all OPParameters from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  OPParameter.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OPParameters."
      });
    });
};

// Find a single OPParameter with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  OPParameter.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving OPParameter with id=" + id
      });
    });
};

// Update a OPParameter by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  OPParameter.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "OPParameter was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update OPParameter with id=${id}. Maybe OPParameter was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating OPParameter with id=" + id
      });
    });
};

// Delete a OPParameter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  OPParameter.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "OPParameter was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete OPParameter with id=${id}. Maybe OPParameter was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete OPParameter with id=" + id
      });
    });
};


// find all published OPParameter
exports.findAllPublished = (req, res) => {
  OPParameter.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving OPParameters."
      });
    });
};
