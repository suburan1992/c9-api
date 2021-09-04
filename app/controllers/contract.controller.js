const db = require("../models");
const Contract = db.contracts;
const Op = db.Sequelize.Op;

// Create and Save a new Contract
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.name) {
    res.status(400).send({
      message: "Contract name or code can not be empty!"
    });
    return;
  }

  // Create a Contract
  const contract = {
    name: req.body.name,
    code: req.body.code,
    status: req.body.status ? req.body.status : false
  };

  // Save Contract in the database
  Contract.create(contract)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contract."
      });
    });
};

// Retrieve all Contracts from the database.
exports.findAll = async (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;  
    ///////// where clause ///////////////
    const code = req.query.code;
    var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
    try{
        records = await Contract.findAndCountAll({ where: condition, limit:limit, offset: offset })
        res.status(201).send({data:records.rows,total: records.count, message:"Success"});
    }catch(e){
        res.status(500).json({data:[], message:"Error : "+e.message()});
    }
};

// Find a single Contract with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contract.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contract with id=" + id
      });
    });
};

// Update a Contract by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Contract.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contract was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Contract with id=${id}. Maybe Contract was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contract with id=" + id
      });
    });
};

// Delete a Contract with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contract.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contract was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Contract with id=${id}. Maybe Contract was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contract with id=" + id
      });
    });
};

// Delete all Contracts from the database.
exports.deleteAll = (req, res) => {
  Contract.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Contracts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contracts."
      });
    });
};

// find all published Contract
exports.findAllActive = (req, res) => {
  Contract.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contracts."
      });
    });
};
