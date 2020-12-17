const { User } = require("../../models");
const { hash } = require("bcryptjs");

const createUser = async (_, args) => {
  const { firstName, lastName, email, password } = args;
  const hashedPassword = await hash(password, 12);
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return user;
  } catch (err) {
    console.error(err);
  }
};

module.exports = createUser;
