module.exports = app => {
  const vacancies = require("../controllers/vacancy.controller.js");

  var router = require("express").Router();

  // Create a new Vacancy
  router.post("/", vacancies.create);
  
  // Retrieve all vacancies  
  router.get("/form", vacancies.createVacancyForm);

  // Retrieve all vacancies
  router.get("/", vacancies.findAll);

  // Retrieve all published vacancies
  router.get("/active", vacancies.findAllActive);

  // Retrieve a single Vacancy with id
  router.get("/:id", vacancies.findOne);

  // Update a Vacancy with id
  router.put("/:id", vacancies.update);

  // Delete a Vacancy with id
  router.delete("/:id", vacancies.delete);

  // Delete all vacancies
  // router.delete("/", vacancies.deleteAll);

  app.use('/api/vacancies', router);
};
