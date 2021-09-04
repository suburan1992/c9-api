module.exports = app => {
  const parameter = require("../controllers/parameter.controller.js");

  var router = require("express").Router();

  // Create a new parameter
  router.post("/", parameter.create);

  // Retrieve all parameter
  router.get("/", parameter.findAll);

  // Retrieve all published parameter
  router.get("/published", parameter.findAllPublished);

  // Retrieve a single parameter with id
  router.get("/:id", parameter.findOne);

  // Update a parameter with id
  router.put("/:id", parameter.update);

  // Delete a parameter with id
  router.delete("/:id", parameter.delete);

  // Delete all parameter
  //router.delete("/", parameter.deleteAll);
  
  app.use('/api/parameters', router);
};
