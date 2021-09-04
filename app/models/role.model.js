module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        name: {
            type: Sequelize.STRING
        },
        code:{
            type: Sequelize.STRING
        },
        value:{
            type: Sequelize.INTEGER
        },
        permissons:{
            type: Sequelize.STRING
        },
        status:{
            type: Sequelize.INTEGER
        }
    })

  return Role;
};
