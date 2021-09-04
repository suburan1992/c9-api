const db = require("../models");
const Designation = db.designations;
const Op = db.Sequelize.Op;

// Create and Save a new Designation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.name) {
    res.status(400).send({
      message: "Designation name or code can not be empty!"
    });
    return;
  }

  // Create a Designation
  const designation = {
    name: req.body.name,
    code: req.body.code,
    status: req.body.status ? req.body.status : false
  };

  // Save Designation in the database
  Designation.create(designation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Designation."
      });
    });
};

// Retrieve all Designations from the database.
// exports.findAll = async (req, res) => {
//     const page = req.query.page;
//     const size = req.query.size;
//     const limit = size ? +size : 10;
//     const offset = page ? page * limit : 0;  
//     ///////// where clause ///////////////
//     const code = req.query.code;
//     var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
//     try{
//         console.log(page, size, limit)
//         records = await Designation.findAndCountAll({ where: condition, limit:limit, offset: offset })
//         res.status(201).send({data:records.rows,total: records.count, message:"Success"});
//     }catch(e){
//         res.status(500).json({data:[], message:"Error : "+e.message()});
//     }
// };

exports.findAll = async (req, res) => {
  ///////// where clause ///////////////
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  try{
      // console.log(page, size, limit)
      records = await Designation.findAndCountAll({ where: condition })
      res.status(201).send({data:records.rows,total: records.count, message:"Success"});
  }catch(e){
      res.status(500).json({data:[], message:"Error : "+e.message()});
  }
};

// Find a single Designation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Designation.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Designation with id=" + id
      });
    });
};

// Update a Designation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Designation.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Designation was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Designation with id=${id}. Maybe Designation was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Designation with id=" + id
      });
    });
};

// Delete a Designation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Designation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Designation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Designation with id=${id}. Maybe Designation was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Designation with id=" + id
      });
    });
};

// Delete all Designations from the database.
exports.deleteAll = (req, res) => {
  Designation.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Designations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Designations."
      });
    });
};

// find all published Designation
exports.findAllActive = (req, res) => {
  Designation.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Designations."
      });
    });
};
