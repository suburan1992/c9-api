module.exports = (sequelize, Sequelize) => {
  const Center = sequelize.define("center", {
    region_id:{
      type: Sequelize.INTEGER
    },
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

  return Center;
};
