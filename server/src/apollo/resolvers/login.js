const { User } = require("../../models");
const { compare } = require("bcryptjs");
const {
  createAccesToken,
  createRefreshToken,
} = require("../../helpers/createTokens");
const sendRefreshToken = require("../../helpers/sendRefreshTokens");

const login = async (_, args, ctx) => {
  const { email, password } = args;
  const { res } = ctx;
  let user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Could not find user");
  }
  user = user.toJSON();
  const valid = await compare(password, user.password);
  if (!valid) {
    throw new Error("wrong password");
  }
  try {
    await sendRefreshToken(res, createRefreshToken(user));
  } catch (err) {
    console.error(err);
  }

  return {
    accessToken: createAccesToken(user),
    user,
  };
};
module.exports = login;
