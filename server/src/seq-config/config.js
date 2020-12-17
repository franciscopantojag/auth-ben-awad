const path = require("path");

module.exports = {
  development: {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "db.sqlite"),
  },
  test: {
    dialect: "sqlite",
    storage: ":memory",
  },
  production: {
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "db.sqlite"),
  },
};
