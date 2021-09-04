module.exports = app => {
    const servicecatagories = require("../controllers/serviceCategory.controller.js");
  
    var router = require("express").Router();
  
    // Create a new servicecatagories
    router.post("/", servicecatagories.create);
  
    // Retrieve all servicecatagories
    router.get("/", servicecatagories.findAll);
  
    // Retrieve all published servicecatagories
    router.get("/active", servicecatagories.findAllActive);
  
    // Retrieve a single servicecatagories with id
    router.get("/:id", servicecatagories.findOne);
  
    // Update a servicecatagories with id
    router.put("/:id", servicecatagories.update);
  
    // Delete a servicecatagories with id
    router.delete("/:id", servicecatagories.delete);
  
 
  
    app.use('/api/ServiceCategory', router);
  };
  