const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vacancies = require("./vacancy.model.js")(sequelize, Sequelize);
db.regions = require("./region.model.js")(sequelize, Sequelize);
db.centers = require("./center.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.designations = require("./designation.model.js")(sequelize, Sequelize);
db.departments = require("./department.model.js")(sequelize, Sequelize);
db.agreements = require("./agreement.model.js")(sequelize, Sequelize);
db.contracts = require("./contract.model.js")(sequelize, Sequelize);
db.onboards = require("./onboard.model.js")(sequelize, Sequelize);
db.designationCategory = require("./designationCategory.model.js")(
  sequelize,
  Sequelize
);
db.serviceCategory = require("./serviceCatagory.model.js")(
  sequelize,
  Sequelize
);
db.procedureCatagory = require("./procedureCatagory.model.js")(
  sequelize,
  Sequelize
);
db.parameters = require("./parameter.model")(sequelize, Sequelize);
db.userCenterMap = require("./userCenterMap.model.js")(sequelize, Sequelize);
db.procedures = require("./procedure.model.js")(sequelize, Sequelize);
db.opparameters = require("./opparameter.model.js")(sequelize, Sequelize);
db.ipparameters = require("./ipparameter.model.js")(sequelize, Sequelize);
db.documents = require("./document.model.js")(sequelize, Sequelize);
db.doctors = require("./doctor.model.js")(sequelize, Sequelize);
db.commercialcategories = require("./commercialCategory.model.js")(
  sequelize,
  Sequelize
);
db.domaincategories = require("./domainCategory.model.js")(
  sequelize,
  Sequelize
);

db.doctorpipparameters = require("./doctoripparameter.model.js")(
  sequelize,
  Sequelize
);
db.doctorpopparameters = require("./doctoropparameter.model.js")(
  sequelize,
  Sequelize
);
db.doctorcommercials = require("./doctorcommercial.model.js")(
  sequelize,
  Sequelize
);
db.billings = require("./billing.model.js")(sequelize, Sequelize);
db.topbillings = require("./topbilling.model.js")(sequelize, Sequelize);
db.topdoctors = require("./topdoctor.model.js")(sequelize, Sequelize);

// associations
db.users.belongsToMany(db.centers, {
  through: "usercentermaps",
  foreignKey: "userId",
});
db.centers.belongsToMany(db.users, {
  through: "usercentermaps",
  foreignKey: "centerId",
});
db.parameters.belongsTo(db.designations, { foreignKey: "designationId" });
db.parameters.belongsTo(db.departments, { foreignKey: "departmentId" });
db.parameters.belongsTo(db.procedures, { foreignKey: "procedureId" });
db.parameters.belongsTo(db.serviceCategory, {
  foreignKey: "serviceCatagoryId",
});
db.procedures.belongsTo(db.procedureCatagory, { foreignKey: "id" });
db.procedures.belongsTo(db.commercialcategories, { foreignKey: "commercial" });
db.procedures.belongsTo(db.domaincategories, { foreignKey: "domain" });

// db.onboards.belongsTo(db.doctorcommercials, { foreignKey: "doctorid" });

db.centers.belongsTo(db.regions, { foreignKey: "region_id" });

module.exports = db;
