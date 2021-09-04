const db = require("../models");
const DomainCategory = db.domaincategories;
const Op = db.Sequelize.Op;

// Create and Save a new DesignationCategory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "DomainCategory name or code can not be empty!",
    });
    return;
  }

  // Create a DomainCategory
  const domaincategory = {
    name: req.body.name,
    // code: req.body.code,
    status: req.body.status ? req.body.status : false,
  };

  // Save DomainCategory in the database
  DomainCategory.create(domaincategory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the DomainCategory.",
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
  try {
    records = await DomainCategory.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      raw: true,
    });
    res
      .status(200)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e.message() });
  }
};

// Find a single DomainCategory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DomainCategory.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving DomainCategory with id=" + id,
      });
    });
};

// Update a DomainCategory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DomainCategory.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "DomainCategory was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update DomainCategory with id=${id}. Maybe DomainCategory was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating DomainCategory with id=" + id,
      });
    });
};

// Delete a DomainCategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DomainCategory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "DomainCategory was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete DomainCategory with id=${id}. Maybe DomainCategory was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete DomainCategory with id=" + id,
      });
    });
};

// Delete all DomainCategory from the database.
exports.deleteAll = (req, res) => {
  DesignationCategory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} DomainCategory were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all DomainCategory.",
      });
    });
};

// find all published DesignationCategory
exports.findAllActive = (req, res) => {
  DesignationCategory.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving DomainCategory.",
      });
    });
};
