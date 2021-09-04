module.exports = (sequelize, Sequelize) => {
  const Procedure = sequelize.define("procedure", {
    name: {
      type: Sequelize.STRING,
    },
    
    commercial: {
      type: Sequelize.STRING,
    },
    domain: {
      type: Sequelize.STRING,
    },
    remark: {
      type: Sequelize.STRING,
    },
    platinumPrice: {
      type: Sequelize.STRING,
    },
    payout: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Procedure;
};
