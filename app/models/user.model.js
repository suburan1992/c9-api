module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        },
        mobile:{
            type:Sequelize.STRING
        },
        profile_picture:{
            type:Sequelize.STRING
        },
        gender:{
            type:Sequelize.INTEGER
        },
        dob:{
            type:Sequelize.DATE
        },
        users_role_id:{
            type:Sequelize.INTEGER
        },
        status:{
            type:Sequelize.INTEGER
        },
    })

  return User;
};
