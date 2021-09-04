module.exports = (sequelize, Sequelize) => {
    const DesignationCategory = sequelize.define("designationCategory", {
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

  return DesignationCategory;
};
