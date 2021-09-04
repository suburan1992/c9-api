const multer = require('multer');
const path = require('path');
module.exports = app => {
  const documents = require("../controllers/document.controller.js");

  
// Document Upload Location
const docStorage = multer.diskStorage({
    destination: './uploads', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const docUpload = multer({

    storage: docStorage,

    limits: {

        fileSize: 5000000   // 5000000 Bytes = 5 MB

    },

    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(pdf|doc|docx|png|jpg)$/)) {     // upload only pdf,doc,docx,png and jpg format

            req.fileValidationError = 'Invalid File';

            return cb(null, false, new Error('Please upload a Valid File'))

        }

        cb(null, true)

    }

}) 


  var router = require("express").Router();

  // Create a new Document
  router.post("/uploadOne", docUpload.single('docFile'), documents.createOne);
  router.post("/uploadMany", docUpload.array('docFiles'), documents.createMany);  

  router.get("/list",documents.list);
  
  router.get("/list/:id",documents.findOne);
  router.get("/download/:name",documents.download); 
  
  app.use('/api/documents', router);
};
