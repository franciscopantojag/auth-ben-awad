const { verify } = require("jsonwebtoken");

const isAuth = (_args, ctx, next) => {
  const authorization = ctx.req.headers["authorization"];
  if (!authorization) {
    return null;
  }
  try {
    const token = authorization.split("bearer ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    ctx.payload = payload;
  } catch (err) {
    console.error(err);
    return null;
  }
  return next();
};

module.exports = isAuth;
