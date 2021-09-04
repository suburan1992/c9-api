const db = require("../models");
const DesignationCategory = db.designationCategory;
const Op = db.Sequelize.Op;

// Create and Save a new DesignationCategory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "DesignationCategory name or code can not be empty!"
    });
    return;
  }

  // Create a DesignationCategory
  const designationcategory = {
    name: req.body.name,
    code: req.body.code,
    status: req.body.status ? req.body.status : false
  };

  // Save DesignationCategory in the database
  DesignationCategory.create(designationcategory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the DesignationCategory."
      });
    });
};

// Retrieve all DesignationCategorys from the database.
exports.findAll = async (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;  
    ///////// where clause ///////////////
    const code = req.query.code;
    var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
    try{
        records = await DesignationCategory.findAndCountAll({ where: condition, limit:limit, offset: offset, raw: true })
        res.status(200).send({data:records.rows,total: records.count, message:"Success"});
    }catch(e){
        res.status(500).json({data:[], message:"Error : "+e.message()});
    }
};

// Find a single DesignationCategory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DesignationCategory.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving DesignationCategory with id=" + id
      });
    });
};

// Update a DesignationCategory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DesignationCategory.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "DesignationCategory was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update DesignationCategory with id=${id}. Maybe DesignationCategory was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating DesignationCategory with id=" + id
      });
    });
};

// Delete a DesignationCategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DesignationCategory.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "DesignationCategory was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete DesignationCategory with id=${id}. Maybe DesignationCategory was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete DesignationCategory with id=" + id
      });
    });
};

// Delete all DesignationCategorys from the database.
exports.deleteAll = (req, res) => {
  DesignationCategory.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} DesignationCategorys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all DesignationCategorys."
      });
    });
};

// find all published DesignationCategory
exports.findAllActive = (req, res) => {
  DesignationCategory.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving DesignationCategorys."
      });
    });
};
