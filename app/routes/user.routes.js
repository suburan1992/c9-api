module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/byrole/:role", users.findAllByRole);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);
/*
  // Delete a Users with id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);
*/
  app.use('/api/users', router);
};
