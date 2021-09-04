module.exports = (sequelize, Sequelize) => {
  const Document = sequelize.define("documents", {
    doctorId: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    docTitle: {
      type: Sequelize.STRING
    },
    docValue: {
      type: Sequelize.STRING
    },
    url:{
      type: Sequelize.STRING
    },
    status:{
      type: Sequelize.BOOLEAN
    },
    isVerified:{
        type: Sequelize.STRING
    },
    verificationRemark:{
      type: Sequelize.STRING
    },
    verifiedBy:{
        type:Sequelize.INTEGER
    }
  });

  return Document;
};
