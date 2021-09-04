module.exports = (app) => {
    const topdoctors = require("../controllers/topdoctor.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all  billing
    router.get("/", topdoctors.findAll);
  
  
    app.use("/api/topdoctors", router);
  };