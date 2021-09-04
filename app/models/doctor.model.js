module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define("doctor", {
    fullname: {
      type: Sequelize.STRING,
    },
    designationlist: {
      type: Sequelize.STRING,
    },
    departmentlist: {
      type: Sequelize.STRING,
    },
    centers: {
      type: Sequelize.STRING,
    },
  });

  return Doctor;
};
