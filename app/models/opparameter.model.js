module.exports = (sequelize, Sequelize) => {
  const OPParameter = sequelize.define("opparameters", {
   item_group:{
       type: Sequelize.STRING
   },
   sub_item:{
        type: Sequelize.STRING
    },
    fixed_payout:{
        type: Sequelize.STRING
    },
    percentage_payout:{
        type: Sequelize.STRING
    },
    count:{
        type: Sequelize.INTEGER
    },
    per_unit_charge:{
        type: Sequelize.STRING
    },
    amount:{
        type: Sequelize.STRING
    },
    revenue:{
        type: Sequelize.STRING  
    },
    payout:{
        type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });

  return OPParameter;
};
