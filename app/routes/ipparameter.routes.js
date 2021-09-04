module.exports = app => {
  const ipparameters = require("../controllers/ipparameter.controller.js");

  var router = require("express").Router();

  // Create a new ipparameter
  router.post("/", ipparameters.create);

  // Retrieve all ipparameters
  router.get("/", ipparameters.findAll);

  // Retrieve all published ipparameters
  router.get("/published", ipparameters.findAllPublished);

  // Retrieve a single ipparameter with id
  router.get("/:id", ipparameters.findOne);

  // Update a ipparameter with id
  router.put("/:id", ipparameters.update);

  // Delete a ipparameter with id
  router.delete("/:id", ipparameters.delete);

  // Delete all ipparameters
  //router.delete("/", ipparameters.deleteAll);
  
  app.use('/api/ipparameters', router);
};
