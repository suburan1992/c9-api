module.exports = app => {
  const roles = require("../controllers/role.controller.js");

  var router = require("express").Router();

  // Create a new Role
  router.post("/", roles.create);

  // Retrieve all roles
  router.get("/", roles.findAll);

  // Retrieve all published roles
  router.get("/published", roles.findAllPublished);

  // Retrieve a single Role with id
  router.get("/:id", roles.findOne);

  // Update a Role with id
  router.put("/:id", roles.update);

  // Delete a Role with id
  router.delete("/:id", roles.delete);

  // Delete all roles
  // router.delete("/", roles.deleteAll);

  app.use('/api/roles', router);
};
