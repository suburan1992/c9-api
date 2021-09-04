module.exports = app => {
  const designations = require("../controllers/designation.controller.js");

  var router = require("express").Router();

  // Create a new Designation
  router.post("/", designations.create);

  // Retrieve all designations
  router.get("/", designations.findAll);

  // Retrieve all published designations
  router.get("/active", designations.findAllActive);

  // Retrieve a single Designation with id
  router.get("/:id", designations.findOne);

  // Update a Designation with id
  router.put("/:id", designations.update);

  // Delete a Designation with id
  router.delete("/:id", designations.delete);

  // Delete all designations
  // router.delete("/", designations.deleteAll);

  app.use('/api/designations', router);
};
