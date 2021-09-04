module.exports = app => {
  const opparameters = require("../controllers/opparameter.controller.js");

  var router = require("express").Router();

  // Create a new opparameter
  router.post("/", opparameters.create);

  // Retrieve all opparameters
  router.get("/", opparameters.findAll);

  // Retrieve all published opparameters
  router.get("/published", opparameters.findAllPublished);

  // Retrieve a single opparameter with id
  router.get("/:id", opparameters.findOne);

  // Update a opparameter with id
  router.put("/:id", opparameters.update);

  // Delete a opparameter with id
  router.delete("/:id", opparameters.delete);

  // Delete all opparameters
  //router.delete("/", opparameters.deleteAll);
  
  app.use('/api/opparameters', router);
};
