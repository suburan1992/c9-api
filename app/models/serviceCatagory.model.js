module.exports = (sequelize, Sequelize) => {
    const ServiceCategory = sequelize.define("servicecategories", {
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

  return ServiceCategory;
};
