const db = require("../models");
const Region = db.regions;
const Op = db.Sequelize.Op;

// Create and Save a new Region
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Region
  const Region = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Region in the database
  Region.create(Region)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Region."
      });
    });
};

// Retrieve all Regions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Region.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions."
      });
    });
};

// Find a single Region with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Region.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Region with id=" + id
      });
    });
};

// Update a Region by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Region.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Region was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Region with id=${id}. Maybe Region was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Region with id=" + id
      });
    });
};

// Delete a Region with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Region.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Region was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Region with id=${id}. Maybe Region was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Region with id=" + id
      });
    });
};

// Delete all Regions from the database.
exports.deleteAll = (req, res) => {
  Region.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Regions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Regions."
      });
    });
};

// find all published Region
exports.findAllPublished = (req, res) => {
  Region.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions."
      });
    });
};
