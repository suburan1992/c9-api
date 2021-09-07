const db = require("../models");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sendEmail = require("./../helpers/sendEmail");
const Onboard = db.onboards;
const User = db.users;
const DoctorCommercial = db.doctorcommercials;
const DoctorIPParameter = db.doctorpipparameters;
const DoctorOPParameter = db.doctorpopparameters;
const Op = db.Sequelize.Op;

// Create and Save a new Agreement
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.data.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  console.log(req.body, "1234567");
  // Create a User
  var doctorId = null;
  try {
    const user = {
      email: req.body.data.email,
      name: req.body.data.fullname,
      mobile: req.body.data.mobile,
      //"gender": req.body.data.gender,
      dob: req.body.data.birthday,
      users_role_id: 4,
      password: bcrypt.hashSync("123456", 8),
      status: 2,
    };

    doctorData = await User.create(user).catch((error) => {});
    doctorId = doctorData.id;

    doctorCommercialData = { ...req.body.data, doctorId: doctorId };

    doctorCommercialData = await DoctorCommercial.create(
      doctorCommercialData
    ).catch((err) => {
      throw new Error(500);
    });
    console.log(req.body.opservice.length, "k345545456565656");
    if (req.body.opservice.length > 0) {
      opservicedata = req.body.opservice;
      opservicedata.forEach((element) => {
        element.doctorId = doctorId;
      });

      // opservicedata[0].doctorId = doctorId;
      // opservicedata[1].doctorId = doctorId;
      doctoropdata = await DoctorOPParameter.bulkCreate(opservicedata).catch(
        (err) => {
          throw new Error(500);
        }
      );
    }
    if (req.body.ipservice.length > 0) {
      ipservicedata = req.body.ipservice;
      ipservicedata.forEach((element) => {
        element.doctorId = doctorId;
      });
      // ipservicedata[0].doctorId = doctorId;
      // ipservicedata[1].doctorId = doctorId;
      doctoripdata = await DoctorIPParameter.bulkCreate(ipservicedata).catch(
        (err) => {
          throw new Error(500);
        }
      );
    }

    onboardData = {
      doctorId: doctorId,
      // region_id: region_id,
      name: req.body.data.fullname,
      currentAction: "Initiated",
      currentActionBy: 2,
      nextAction: "Document Uploading",
      status: 1,
    };
    onboardData = await Onboard.create(onboardData).catch((err) => {
      throw new Error(500);
    });
    await sendEmail({
      to: doctorData.email,
      subject: "Onboard Initiated",
      html: `
            <h4>Welcome to Cloud 9 Family</h4>
             <p>Please login and upload your documents!</p>
             <p> Your Default password is 123456
            `,
    }).catch((err) => {
      throw new Error(err);
    });
    res.status(201).send({ doctorData: doctorData, onboardData: onboardData });
  } catch (error) {
    rollbackOperation(doctorId);
    res.status(500).send({ message: "fail", error: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    doctorDetails = await User.findByPk(id).catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
    doctorCommercial = await DoctorCommercial.findAll({
      where: { doctorId: id },
    });

    doctorIPParameter = await DoctorIPParameter.findAll({
      where: { doctorId: id },
    });
    doctorOPParameter = await DoctorOPParameter.findAll({
      where: { doctorId: id },
    });
    onBoardData = await Onboard.findAll({
      where: { doctorId: id },
    });
    records = {
      doctorDetails: doctorDetails,
      doctorCommercial: doctorCommercial,
      doctorIPParameter: doctorIPParameter,
      doctorOPParameter: doctorOPParameter,
      onBoardData: onBoardData,
    };
  } catch (error) {
    res.send({ message: "fail" });
  }
  res.send(records);
};

exports.findAll = async (req, res) => {
  ///////// where clause ///////////////
  const code = req.query.code;
  var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  try {
    records = await Onboard.findAndCountAll({
      where: condition,
      // include: [
      //   { model: db.doctorcommercials, attributes: ["fullname", "doctorid"] },
      // ],
    });
    res
      .status(201)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e.message() });
  }
};

exports.findOnboardingInitiated = async (req, res) => {
  ///////// where clause ///////////////
  //const code = req.query.code;
  var condition = { currentAction: "rd-approval" };
  try {
    records = await Onboard.findAndCountAll({
      where: condition,
      // include: [
      //   { model: db.doctorcommercials, attributes: ["fullname", "doctorid"] },
      // ],
    });
    res
      .status(201)
      .send({ data: records.rows, total: records.count, message: "Success" });
  } catch (e) {
    res.status(500).json({ data: [], message: "Error : " + e.message() });
  }
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body, "onboardStatus");
  Onboard.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Onboard was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Onboard with id=${id}. Maybe Onboard was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Onboard with id=" + id,
      });
    });
};

// exports.updateNew = async (req, res) => {
//   const id = req.params.id;
//   try{
//   console.log("recieved id : ", id);
//   doctorData = await User.findByPk(req.body.data.doctorId).catch((error) => { console.log("some error encountered - 1") });
//   onboardData = {
//     doctorId: req.body.data.doctorId,
//     // region_id: region_id,
//     name: req.body.data.fullname,
//     currentAction: req.body.data.currentAction,
//     currentActionBy: req.body.data.currentActionBy,
//     nextAction: req.body.data.nextAction,
//     status: 1,
//   };

//   onboardData = await Onboard.create(onboardData).catch((err) => { console.log("some error encountered - 2") });

//   await sendEmail({
//     to: doctorData.email,
//     subject: "Onboard Status Changed",
//     html: `
//           Action taken on the onboarding process. Please check your dashboard.
//           Current Action is ${req.body.data.currentAction}
//           Next Action is ${req.body.data.nextAction}
//           `,
//   }).catch((err) => { console.log("some error encountered - 3") });
//   }catch(e){
//     console.log(e)
//   }

//   res.send({
//     message: "Onboard was updated successfully.",
//   });

// }

// exports.updateOnboardStatus = async (req, res) => {
//   const id = req.params.id;
//   updateData = {
//     doctorId: req.body.doctorId,
//     currentAction: req.body.action,
//     currenActionBy: req.body.userId,
//     nextAction: req.body.nextAction,
//     remark: req.body.remark,
//     status: 1,
//   };

//   try {
//     newData = await Onboard.create(updateData).catch((err) => {
//       throw new Error(500);
//     });

//     user = await User.findByPk(updateData.doctorId);
//     await sendEmail({
//       to: user.email,
//       subject: "Onboard Status Updated",
//       html: `
//             <h4>Onboarding update</h4>
//              <p>Current Action : ${req.body.action}</p>
//              <p>Next Action : ${req.body.nextAction}</p>
//              <p> Please login to see the status and if required do the needful.</p>
//             `,
//     }).catch((err) => {
//       throw new Error(err);
//     });
//   } catch (error) {
//     res.status(500).send({ message: "fail", error: error.message });
//   }
// };

const rollbackOperation = (id) => {};
