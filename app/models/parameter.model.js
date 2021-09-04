module.exports = (sequelize, Sequelize) => {
  const Parameter = sequelize.define("parameter", {
    name: {
      type: Sequelize.STRING,
    },
    procedureId: {
      type: Sequelize.INTEGER,
    },
    departmentId: {
      type: Sequelize.INTEGER,
    },
    designationId: {
      type: Sequelize.INTEGER,
    },
    serviceCatagoryId: {
      type: Sequelize.STRING,
    },
    calculationType: {
      type: Sequelize.STRING,
    },
    remark: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Parameter;
};
