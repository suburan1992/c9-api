module.exports = (sequelize, Sequelize) => {
  const Region = sequelize.define("region", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  return Region;
};
