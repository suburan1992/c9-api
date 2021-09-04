module.exports = app => {
    const procedurecatagories = require("../controllers/procedureCategory.controller.js");
  
    var router = require("express").Router();
  
    // Create a new procedurecatagories
    router.post("/", procedurecatagories.create);
  
    // Retrieve all procedurecatagories
    router.get("/", procedurecatagories.findAll);
  
    // Retrieve all published procedurecatagories
    router.get("/active", procedurecatagories.findAllActive);
  
    // Retrieve a single procedurecatagories with id
    router.get("/:id", procedurecatagories.findOne);
  
    // Update a procedurecatagories with id
    router.put("/:id", procedurecatagories.update);
  
    // Delete a procedurecatagories with id
    router.delete("/:id", procedurecatagories.delete);
  
 
  
    app.use('/api/ProcedureCategory', router);
  };
  