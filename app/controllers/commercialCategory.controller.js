const db = require("../models");
const CommercialCategory = db.commercialcategories;
const Op = db.Sequelize.Op;

// Create and Save a new DesignationCategory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "CommercialCategory name or code can not be empty!",
    });
    return;
  }

  // Create a CommercialCategory
  const commercialcategory = {
    name: req.body.name,
    // code: req.body.code,
    status: req.body.status ? req.body.status : false,
  };

  // Save CommercialCategory in the database
  CommercialCategory.create(commercialcategory)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the CommercialCategory.",
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
    records = await CommercialCategory.findAndCountAll({
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

// Find a single CommercialCategory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CommercialCategory.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving CommercialCategory with id=" + id,
      });
    });
};

// Update a CommercialCategory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  CommercialCategory.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "CommercialCategory was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update CommercialCategory with id=${id}. Maybe CommercialCategory was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating CommercialCategory with id=" + id,
      });
    });
};

// Delete a CommercialCategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CommercialCategory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "CommercialCategory was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete CommercialCategory with id=${id}. Maybe CommercialCategory was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete CommercialCategory with id=" + id,
      });
    });
};

// Delete all CommercialCategory from the database.
exports.deleteAll = (req, res) => {
  DesignationCategory.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} CommercialCategory were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all CommercialCategory.",
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
          "Some error occurred while retrieving CommercialCategory.",
      });
    });
};
