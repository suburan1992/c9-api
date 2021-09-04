const db = require("../models");
const User = db.users;
const center = db.centers;
const Op = db.Sequelize.Op;

// 
// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    const page = req.query.page;
    const size = req.query.size;
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    const userid = req.params.id  
    ///////// where clause ///////////////  
    ////const email = req.query.email;
    var condition = userid ? { id : { [Op.like]: `%${userid}%` } } : null;
    try{
        records = await User.findAndCountAll({ 
          include: {model:center, attributes: ['id','name']},
          where: condition, 
          limit:limit,
          offset: offset
         })

        res.status(201).send({data:records.rows,total: records.count, message:"Success"});
    }catch(e){
        res.status(500).json({data:[], message:"Error : "+e.message()});
    }
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const userid = req.params.id;
  condition = {id : userid}
  User.findAll({
    where:condition,
    include: {model:center, attributes: ['id','name']}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// find all published User
exports.findAllByRole = (req, res) => {
  roleVal = req.params.role;  
  User.findAll({ where: { users_role_id : roleVal} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
