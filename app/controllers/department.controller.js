const db = require("../models");
const Department = db.departments;
const Op = db.Sequelize.Op;

// Create and Save a new Department
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.name) {
    res.status(400).send({
      message: "Department name or code can not be empty!"
    });
    return;
  }

  // Create a Department
  const department = {
    name: req.body.name,
    code: req.body.code,
    status: req.body.status ? req.body.status : false
  };

  // Save Department in the database
  Department.create(department)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department."
      });
    });
};

// Retrieve all Departments from the database.
exports.findAll = async (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;  
    ///////// where clause ///////////////
    const code = req.query.code;
    var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
    try{
        records = await Department.findAndCountAll({ where: condition, limit:limit, offset: offset })
        res.status(201).send({data:records.rows,total: records.count, message:"Success"});
    }catch(e){
        res.status(500).json({data:[], message:"Error : "+e.message()});
    }
};

// Find a single Department with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Department.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Department with id=" + id
      });
    });
};

// Update a Department by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Department.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Department was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Department with id=${id}. Maybe Department was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Department with id=" + id
      });
    });
};

// Delete a Department with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Department.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Department was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Department with id=" + id
      });
    });
};

// Delete all Departments from the database.
exports.deleteAll = (req, res) => {
  Department.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Departments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Departments."
      });
    });
};

// find all published Department
exports.findAllActive = (req, res) => {
  Department.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments."
      });
    });
};
