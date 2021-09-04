module.exports = (sequelize, Sequelize) => {
    const UserCenterMap = sequelize.define("usercentermaps", {
        userId:{
            type:Sequelize.INTEGER
        },
        centerId:{
            type: Sequelize.INTEGER
        }
    })

  return UserCenterMap;
};
