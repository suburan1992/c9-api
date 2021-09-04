module.exports = (sequelize, Sequelize) => {
  const IPParameter = sequelize.define("ipparameters", {
   procedure:{
       type: Sequelize.STRING
   },
   payoutType:{
        type: Sequelize.STRING
    },
    parameter_name:{
        type: Sequelize.STRING
    },
    parameter_value:{
        type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  return IPParameter;
};
