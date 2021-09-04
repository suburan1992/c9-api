module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define("contracts", {
        name: {
            type: Sequelize.STRING
        },
        code:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.INTEGER
        }
    })

  return Contract;
};
