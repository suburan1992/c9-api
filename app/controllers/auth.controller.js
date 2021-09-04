const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const e = require("cors");

exports.signup = (req, res) => {
  // Save User to Database
  var d = req.body;
  d.password = bcrypt.hashSync(d.password, 8);
  User.create(d)
    .then(user => {
      res.status(201).send({user:user})
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
    
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    },
    raw: true
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (user && !passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ sup: user.id, role: user.users_role_id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
         user:{ id: user.id,
          username: user.name,
          email: user.email,
          roles: user.users_role_id
         }, 
          accessToken: token
        });
    })
    .catch(err => {console.log(err);
      res.status(500).send({ message: e.message() });
    });
};

exports.test = (req, res) => {
    res.status(200).send({"message":"Auth is working"})
}