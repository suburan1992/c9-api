module.exports = (sequelize, Sequelize) => {
    const Designation = sequelize.define("designations", {
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

  return Designation;
};