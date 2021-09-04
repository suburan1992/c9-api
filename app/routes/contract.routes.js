module.exports = app => {
  const contracts = require("../controllers/contract.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", contracts.create);

  // Retrieve all contracts
  router.get("/", contracts.findAll);

  // Retrieve all published contracts
  router.get("/active", contracts.findAllActive);

  // Retrieve a single Tutorial with id
  router.get("/:id", contracts.findOne);

  // Update a Tutorial with id
  router.put("/:id", contracts.update);

  // Delete a Tutorial with id
  router.delete("/:id", contracts.delete);

  // Delete all contracts
  //router.delete("/", contracts.deleteAll);

  app.use('/api/contracts', router);
};
