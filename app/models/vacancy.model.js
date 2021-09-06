module.exports = (sequelize, Sequelize) => {
    const Vacancy = sequelize.define("vacancy", {
        label:{
            type:Sequelize.STRING // payout, onboarding, position
        },
        code:{
            type: Sequelize.STRING
        },
        // designationId:{
        //     type: Sequelize.INTEGER
        // },
        designationLabel:{
            type: Sequelize.STRING
        },
        category:{
            type: Sequelize.STRING
        },
        // departmentId:{
        //     type: Sequelize.INTEGER
        // },
        departmentLabel:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        centerNames:{
            type: Sequelize.STRING
        },
        comments:{
            type: Sequelize.STRING
        },
        // centerIds:{
        //     type: Sequelize.STRING
        // },
        postedBy:{
            type: Sequelize.INTEGER
        },
        status:{
            type: Sequelize.INTEGER // ongoing - 
        }
    })
 
  return Vacancy;
};