module.exports = (sequelize, Sequelize) => {
    const topbilling = sequelize.define("billingreport", {
      MPI: {
        type: Sequelize.STRING,
      },
      Patient_Name: {
        type: Sequelize.STRING,
      },
      Bill_No: {
        type: Sequelize.STRING,
      },
      Bill_Date: {
        type: Sequelize.STRING,
      },
      Bill_Amt: {
        type: Sequelize.STRING,
      },
      Contra_Disc_Name: {
        type: Sequelize.STRING,
      },
      Contra_Disc_Amount: {
        type: Sequelize.STRING,
      },
      Mangment_Disc_Name: {
        type: Sequelize.STRING,
      },
      Mangment_Disc_Amount: {
        type: Sequelize.STRING,
      },
      Proff_Disc_Amount: {
        type: Sequelize.STRING,
      },
      Proff_Disc_Name: {
        type: Sequelize.STRING,
      },
      Category: {
        type: Sequelize.STRING,
      },
      User_Name: {
        type: Sequelize.STRING,
      },
    });
  
    return topbilling;
  };
  