const db = require("../models");
const IPParameter = db.ipparameters;
const Op = db.Sequelize.Op;

// Create and Save a new IPParameter
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a IPParameter
  const ipparameter = {
    region_id: req.body.region,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status ? req.body.status : 0
  };

  // Save IPParameter in the database
  IPParameter.create(ipparameter)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the IPParameter."
      });
    });
};

// Retrieve all IPParameters from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  IPParameter.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving IPParameters."
      });
    });
};

// Find a single IPParameter with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  IPParameter.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving IPParameter with id=" + id
      });
    });
};

// Update a IPParameter by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  IPParameter.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "IPParameter was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update IPParameter with id=${id}. Maybe IPParameter was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating IPParameter with id=" + id
      });
    });
};

// Delete a IPParameter with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  IPParameter.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "IPParameter was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete IPParameter with id=${id}. Maybe IPParameter was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete IPParameter with id=" + id
      });
    });
};


// find all published IPParameter
exports.findAllPublished = (req, res) => {
  IPParameter.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving IPParameters."
      });
    });
};
