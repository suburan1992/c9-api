module.exports = (sequelize, Sequelize) => {
  const DoctorIPParameter = sequelize.define("doctoripparameters", {
   doctorId:{
    type: Sequelize.INTEGER
   },
   ipfixedroom: {
    type: Sequelize.STRING
   },
   ipfixedmodeofpay: {
    type: Sequelize.STRING
   },
   ipfixedamount: {
    type: Sequelize.STRING
   },
   ipsurgeonfee: {
    type: Sequelize.STRING
   },
   ippackageamount: {
    type: Sequelize.STRING
   },
   ipgrossbillamount: {
    type: Sequelize.STRING
   },
   ipnetbillamount: {
    type: Sequelize.STRING
   },
   ippercamount: {
    type: Sequelize.STRING
   },
   ipcount: {
    type: Sequelize.STRING
   },
   iprevenue: {
    type: Sequelize.STRING
   },
   ippayout: {
    type: Sequelize.STRING
   },
   iptype: {
    type: Sequelize.STRING
   },
  status: {
      type: Sequelize.BOOLEAN
    }
  });

  return DoctorIPParameter;
};
/*
ipcount: "22"
	
ipfixedamount: "112233"
	
ipfixedmodeofpay: "cash"
	
ipfixedroom: "Test"
	
ippackageamount: "12345"
	
ippayout: "667788"
	
ippercamount: "45678"
	
iprevenue: "12345"
	
ipsurgeonfee: "22334"
	
iptype: "Pharmacy"
*/