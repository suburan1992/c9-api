module.exports = app => {
  const agreements = require("../controllers/agreement.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", agreements.create);

  // Retrieve all agreements
  router.get("/", agreements.findAll);

  // Retrieve all published agreements
  router.get("/active", agreements.findAllActive);

  // Retrieve a single Tutorial with id
  router.get("/:id", agreements.findOne);

  // Update a Tutorial with id
  router.put("/:id", agreements.update);

  // Delete a Tutorial with id
  router.delete("/:id", agreements.delete);

  // Delete all agreements
  //router.delete("/", agreements.deleteAll);

  app.use('/api/agreements', router);
};
