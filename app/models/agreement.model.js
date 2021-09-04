module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define("agreements", {
        name: {
            type: Sequelize.STRING
        },
        agreementFile:{
            type: Sequelize.STRING
        },
        doctorId:{
            type: Sequelize.INTEGER
        },
        agreementDate:{
            type: Sequelize.DATE
        },
        status:{
            type: Sequelize.INTEGER
        },
        statusCode:{
            type: Sequelize.STRING
        }
    })

  return Contract;
};
