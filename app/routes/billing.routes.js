module.exports = (app) => {
  const billing = require("../controllers/billing.controller.js");

  var router = require("express").Router();

  // Create a new billing
  router.post("/", billing.create);

  // Retrieve all  billing
  router.get("/", billing.findAll);

  // Delete a center with id
  router.delete("/:id", billing.delete);

  app.use("/api/billings", router);
};
