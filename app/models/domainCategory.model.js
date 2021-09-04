module.exports = (sequelize, Sequelize) => {
    const DomainCategory = sequelize.define("domaincategory", {
        name: {
            type: Sequelize.STRING
        },
        
        status:{
            type: Sequelize.INTEGER
        }
    })

  return DomainCategory;
};
