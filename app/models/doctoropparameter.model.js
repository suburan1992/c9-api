module.exports = (sequelize, Sequelize) => {
  const DoctorOPParameter = sequelize.define("doctoropparameters", {
   doctorId:{
    type: Sequelize.INTEGER
   },
   consultation: {
    type: Sequelize.STRING
   },
   opfixedpay:  {
    type: Sequelize.STRING
   },
   oppercpay:  {
    type: Sequelize.STRING
   },
   opcount:  {
    type: Sequelize.STRING
   },
   opperunitcharge:  {
    type: Sequelize.STRING
   },
   opamount:  {
    type: Sequelize.STRING
   },
   oprevenue:  {
    type: Sequelize.STRING
   },
   oppayout:  {
    type: Sequelize.STRING
   },
   status: {
      type: Sequelize.BOOLEAN
   }
  });

  return DoctorOPParameter;
};
/*
opamount: "123456"
	
opcompanyfixed: "300000"
	
opcompanyperc: "50"
	
opconsultantfixed: "300000"
	
opconsultantperc: "30"
	
opcount: "2"
	
opfixedpay: "123456"
	
oppayout: "334455"
	
oppercpay: "12"
	
opperunitcharge: "12345"
	
oprevenue: "112233"
	
opservice: "op-service"
	
optype: "Lab"
*/

