module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("departments", {
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

  return Department;
};
