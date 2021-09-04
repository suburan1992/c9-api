const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */
// swagger docs route
app.use("/api-docs", require("./app/helpers/swagger"));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// drop the table if it already exists
// db.sequelize.sync({ alter: true}).then(() => {
// console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to C9 api." });
});

require("./app/routes/region.routes")(app);
require("./app/routes/center.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/designation.routes")(app);
require("./app/routes/designationCategory.routes")(app);
require("./app/routes/serviceCatagory.routes")(app);
require("./app/routes/procedureCatagory.routes")(app);
require("./app/routes/department.routes")(app);
require("./app/routes/contract.routes")(app);
require("./app/routes/vacancy.routes")(app);
require("./app/routes/procedure.routes")(app);
require("./app/routes/onboard.routes")(app);
require("./app/routes/opparameter.routes")(app);
require("./app/routes/ipparameter.routes")(app);
require("./app/routes/document.routes")(app);
require("./app/routes/parameter.routes")(app);
require("./app/routes/doctor.routes")(app);
require("./app/routes/domainCatagory.routes")(app);
require("./app/routes/commercialCatagory.routes")(app);
require("./app/routes/billing.routes")(app);
require("./app/routes/topbilling.routes")(app);
require("./app/routes/topdoctor.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
