module.exports = app => {
  const designationcategories = require("../controllers/designationCategory.controller.js");

  var router = require("express").Router();

  // Create a new Designation
  router.post("/", designationcategories.create);

  // Retrieve all designationcategories
  router.get("/", designationcategories.findAll);

  // Retrieve all published designationcategories
  router.get("/active", designationcategories.findAllActive);

  // Retrieve a single Designation with id
  router.get("/:id", designationcategories.findOne);

  // Update a Designation with id
  router.put("/:id", designationcategories.update);

  // Delete a Designation with id
  router.delete("/:id", designationcategories.delete);

  // Delete all designationcategories
  // router.delete("/", designationcategories.deleteAll);

  app.use('/api/designationcategories', router);
};
