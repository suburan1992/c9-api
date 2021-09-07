const db = require("../models");
const Vacancy = db.vacancies;
const Op = db.Sequelize.Op;

exports.createVacancyForm = async (req, res) => {
  const Departments = db.departments;
  const Designations = db.designations;
  const DesignationCategories = db.designationCategory;
  departmentList = await Departments.findAll({ attributes: ["name", "id"] });
  designationList = await Designations.findAll({ attributes: ["name", "id"] });
  designationCategoriesList = await DesignationCategories.findAll({
    attributes: ["name", "id"],
  });

  res.status(200).send({
    departmentList: departmentList,
    designationList: designationList,
    typeList: designationCategoriesList,
    message: "Success",
  });
};

// Create and Save a new Vacancy
exports.create = (req, res) => {
  // Validate request
  if (!req.body.label || !req.body.code) {
    res.status(400).send({
      message: "Vacancy name or code can not be empty!",
    });
    return;
  }

  const vacancy = {
    label: req.body.label,
    designationLabel: req.body.designationLabel,
    category: req.body.category,
    departmentLabel: req.body.departmentLabel,
    centerNames: req.body.centerNames,
    comments: req.body.comments,
    // doctorId: "NA",
    code: req.body.code,
    status: req.body.status ? req.body.status : false,
  };

  // Save Vacancy in the database
  Vacancy.create(vacancy)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vacancy.",
      });
    });
};

// Retrieve all Vacancy from the database.
exports.findAll = async (req, res) => {
  // const page = req.query.page;
  // const size = req.query.size;
  // const limit = size ? +size : 10;
  // const offset = page ? page * limit : 0;
  ///////// where clause ///////////////
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  try {
    records = await Vacancy.findAndCountAll({
      where: condition,
      order: [["updatedAt", "DESC"]],
    });
    res
      .status(200)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e });
  }
};

// Find a single Vacancy with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vacancy.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Vacancy with id=" + id,
      });
    });
};

// Update a Vacancy by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Vacancy.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vacancy was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Vacancy with id=${id}. Maybe Vacancy was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Vacancy with id=" + id,
      });
    });
};

// Delete a Vacancy with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vacancy.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vacancy was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Vacancy with id=${id}. Maybe Vacancy was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Vacancy with id=" + id,
      });
    });
};

// Delete all Vacancy from the database.
exports.deleteAll = (req, res) => {
  Vacancy.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Vacancy were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Vacancy.",
      });
    });
};

// find all published Vacancy
exports.findAllActive = (req, res) => {
  Vacancy.findAll({ where: { status: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Vacancy.",
      });
    });
};
