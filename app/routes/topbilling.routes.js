module.exports = (app) => {
    const topbillings = require("../controllers/topbilling.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all  billing
    router.get("/", topbillings.findAll);
  
  
    app.use("/api/topbillings", router);
  };