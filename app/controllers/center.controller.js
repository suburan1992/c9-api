const db = require("../models");
const Center = db.centers;
const Op = db.Sequelize.Op;

// Create and Save a new Center
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Center
  const center = {
    region_id: req.body.region,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status ? req.body.status : 0
  };

  // Save Center in the database
  Center.create(center)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Center."
      });
    });
};

// Retrieve all Centers from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Center.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Centers."
      });
    });
};

// Find a single Center with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Center.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Center with id=" + id
      });
    });
};

// Update a Center by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Center.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Center was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Center with id=${id}. Maybe Center was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Center with id=" + id
      });
    });
};

// Delete a Center with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Center.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Center was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Center with id=${id}. Maybe Center was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Center with id=" + id
      });
    });
};


// find all published Center
exports.findAllPublished = (req, res) => {
  Center.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Centers."
      });
    });
};
