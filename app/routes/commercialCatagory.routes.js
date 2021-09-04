module.exports = app => {
    const commercialcategory = require("../controllers/commercialCategory.controller");
  
    var router = require("express").Router();
  
    // Create a new commercialcategory
    router.post("/", commercialcategory.create);
  
    // Retrieve all commercialcategory
    router.get("/", commercialcategory.findAll);
  
    // Retrieve all published commercialcategory
    router.get("/active", commercialcategory.findAllActive);
  
    // Retrieve a single commercialcategory with id
    router.get("/:id", commercialcategory.findOne);
  
    // Update a commercialcategory with id
    router.put("/:id", commercialcategory.update);
  
    // Delete a commercialcategory with id
    router.delete("/:id", commercialcategory.delete);
  
 
  
    app.use('/api/CommercialCategory', router);
  };
  