const db = require("../models");
const Role = db.roles;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Role
  const Role = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Role in the database
  Role.create(Role)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Role."
      });
    });
};

// Retrieve all Roles from the database.
exports.findAll = async (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;  
    ///////// where clause ///////////////
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    try{
        records = await Role.findAndCountAll({ where: condition, limit:limit, offset: offset })
        res.status(201).send({data:records.rows,total: records.count, message:"Success"});
    }catch(e){
        res.status(500).json({data:[], message:"Error : "+e.message()});
    }
};

// Find a single Role with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Role.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Role with id=" + id
      });
    });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Role.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Role with id=${id}. Maybe Role was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Role with id=" + id
      });
    });
};

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Role.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id
      });
    });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  Role.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Roles were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Roles."
      });
    });
};

// find all published Role
exports.findAllPublished = (req, res) => {
  Role.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Roles."
      });
    });
};
