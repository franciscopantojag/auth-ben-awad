const { User } = require("../../models");
const { verify } = require("jsonwebtoken");

const me = async (_, args, ctx) => {
  const authorization = ctx.req.headers["authorization"];
  if (!authorization) {
    return null;
  }
  try {
    const token = authorization.split("bearer ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({
      where: { id: payload.userId },
      attributes: { exclude: ["password"] },
    });
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = me;
