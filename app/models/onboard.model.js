module.exports = (sequelize, Sequelize) => {
  const Onboard = sequelize.define("onboards", {
    doctorId: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    currentAction: {
      type: Sequelize.STRING,
    },
    currentActionBy: {
      type: Sequelize.INTEGER,
    },
    nextAction: {
      type: Sequelize.STRING,
    },

    remark: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  });

  return Onboard;
};
