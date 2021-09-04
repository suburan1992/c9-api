module.exports = (sequelize, Sequelize) => {
    const CommercialCategory = sequelize.define("commercialcategory", {
        name: {
            type: Sequelize.STRING
        },
      
        status:{
            type: Sequelize.INTEGER
        }
    })

  return CommercialCategory;
};
