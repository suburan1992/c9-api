module.exports = app => {
  const procedures = require("../controllers/procedure.controller.js");

  var router = require("express").Router();

  // Create a new procedure
  router.post("/", procedures.create);

  // Retrieve all procedures
  router.get("/", procedures.findAll);

  // Retrieve all published procedures
  router.get("/published", procedures.findAllPublished);

  // Retrieve a single procedure with id
  router.get("/:id", procedures.findOne);

  // Update a procedure with id
  router.put("/:id", procedures.update);

  // Delete a procedure with id
  router.delete("/:id", procedures.delete);

  // Delete all procedures
  //router.delete("/", procedures.deleteAll);
  
  app.use('/api/procedures', router);
};
