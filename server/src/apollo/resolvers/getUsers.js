const { User } = require("../../models");

const getUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (err) {
    console.error(err);
  }
};

module.exports = getUsers;
