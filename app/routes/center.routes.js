module.exports = app => {
  const centers = require("../controllers/center.controller.js");

  var router = require("express").Router();

  // Create a new center
  router.post("/", centers.create);

  // Retrieve all centers
  router.get("/", centers.findAll);

  // Retrieve all published centers
  router.get("/published", centers.findAllPublished);

  // Retrieve a single center with id
  router.get("/:id", centers.findOne);

  // Update a center with id
  router.put("/:id", centers.update);

  // Delete a center with id
  router.delete("/:id", centers.delete);

  // Delete all centers
  //router.delete("/", centers.deleteAll);
  
  app.use('/api/centers', router);
};
