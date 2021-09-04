module.exports = (sequelize, Sequelize) => {
    const ProcedureCategory = sequelize.define("procedureCatagory", {
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

  return ProcedureCategory;
};
