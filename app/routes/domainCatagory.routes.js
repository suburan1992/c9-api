module.exports = app => {
    const domaincategory = require("../controllers/domainCategory.controller");
  
    var router = require("express").Router();
  
    // Create a new domaincategory
    router.post("/", domaincategory.create);
  
    // Retrieve all domaincategory
    router.get("/", domaincategory.findAll);
  
    // Retrieve all published domaincategory
    router.get("/active", domaincategory.findAllActive);
  
    // Retrieve a single domaincategory with id
    router.get("/:id", domaincategory.findOne);
  
    // Update a domaincategory with id
    router.put("/:id", domaincategory.update);
  
    // Delete a domaincategory with id
    router.delete("/:id", domaincategory.delete);
  
 
  
    app.use('/api/DomainCategory', router);
  };
  