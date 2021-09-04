module.exports = (sequelize, Sequelize) => {
  const DoctorCommercial = sequelize.define("doctorcommercials", {
    doctorId: {
      type: Sequelize.INTEGER,
    },
    centers: {
      type: Sequelize.JSON,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    BankName: {
      type: Sequelize.STRING,
    },
    fathername: {
      type: Sequelize.STRING,
    },
    noticeperiod: {
      type: Sequelize.STRING,
    },
    lockinperiod: {
      type: Sequelize.STRING,
    },
    indemnityvalue: {
      type: Sequelize.STRING,
    },
    indemnityexpiry: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    designationlist: {
      type: Sequelize.STRING,
    },
    departmentlist: {
      type: Sequelize.STRING,
    },
    businessunit: {
      type: Sequelize.STRING,
    },
    medcouncil: {
      type: Sequelize.STRING,
    },
    contractlength: {
      type: Sequelize.STRING,
    },
    doj: {
      type: Sequelize.STRING,
    },
    fixedservice: {
      type: Sequelize.STRING,
    },
    ctcmonth: {
      type: Sequelize.STRING,
    },
    pgdegree: {
      type: Sequelize.STRING,
    },
    pgtotalexp: {
      type: Sequelize.STRING,
    },
    pgrelevantexp: {
      type: Sequelize.STRING,
    },
    opservice: {
      type: Sequelize.STRING,
    },
    opconsultantperc: {
      type: Sequelize.STRING,
    },
    opcompanyperc: {
      type: Sequelize.STRING,
    },
    opconsultantfixed: {
      type: Sequelize.STRING,
    },
    opcompanyfixed: {
      type: Sequelize.STRING,
    },
    ipservice: {
      type: Sequelize.STRING,
    },
    medicalcertno: {
      type: Sequelize.STRING,
    },
    aadhaarno: {
      type: Sequelize.STRING,
    },
    pancardno: {
      type: Sequelize.STRING,
    },

    bankaccountno: {
      type: Sequelize.STRING,
    },
    ifsccode: {
      type: Sequelize.STRING,
    },
    selectedmcrc: { type: Sequelize.STRING },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });

  return DoctorCommercial;
};
/*

businessunit: "Jayanagar"
	
contractlength: "12"
	
ctcmonth: "22002200"
	
departmentlist: "Cardiology"
	
designationlist: "Consultant"
	
doj: "2021-01-01"
	
?grossbillamount: "23456"
	
medcouncil: "223344"
	
?netbillamount: "34567"

pgdegree: "Yes"
	
pgrelevantexp: "17"
	
pgtotalexp: "14"

isIP:

isOP:

isFixed:

isMG : 

*/
