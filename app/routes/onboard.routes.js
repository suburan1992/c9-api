module.exports = (app) => {
  const onboards = require("../controllers/onboarding.controller.js");

  var router = require("express").Router();

  // Create a new onboard
  router.post("/", onboards.create);

  router.get("/initiated", onboards.findOnboardingInitiated);

  // Retrieve all onboards
  router.get("/", onboards.findAll);

  // Update a center with id
  // router.put("/:id", onboards.updateOnboardStatus);

  // Update a Onboard with id
  router.put("/:id", onboards.update);

  router.get("/:id", onboards.findOne);

  app.use("/api/onboard", router);
};
