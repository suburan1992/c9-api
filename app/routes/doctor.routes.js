module.exports = app => {
  const doctor = require("../controllers/doctor.controller");

  var router = require("express").Router();

 
  router.get("/", doctor.findAll);
 

  app.use('/api/doctor', router);
};
