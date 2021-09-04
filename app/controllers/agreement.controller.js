const db = require("../models");
const Agreement = db.agreements;
const Op = db.Sequelize.Op;

// Create and Save a new Agreement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Agreement
  const agreement = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Agreement in the database
  Agreement.create(agreement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Agreement."
      });
    });
};

// Retrieve all Agreements from the database.
exports.findAll = async (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;  
    ///////// where clause ///////////////
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    try{
        records = await Agreement.findAndCountAll({ where: condition, limit:limit, offset: offset })
        res.status(201).send({data:records.rows,total: records.count, message:"Success"});
    }catch(e){
        res.status(500).json({data:[], message:"Error : "+e.message()});
    }
};

// Find a single Agreement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Agreement.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Agreement with id=" + id
      });
    });
};

// Update a Agreement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Agreement.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Agreement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Agreement with id=${id}. Maybe Agreement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Agreement with id=" + id
      });
    });
};

// Delete a Agreement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Agreement.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Agreement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Agreement with id=${id}. Maybe Agreement was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Agreement with id=" + id
      });
    });
};

// Delete all Agreements from the database.
exports.deleteAll = (req, res) => {
  Agreement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Agreements were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Agreements."
      });
    });
};

// find all published Agreement
exports.findAllActive = (req, res) => {
  Agreement.findAll({ where: { status : 1 } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Agreements."
      });
    });
};
