const { verify } = require("jsonwebtoken");
const { User } = require("../models");
const {
  createAccesToken,
  createRefreshToken,
} = require("../helpers/createTokens");
const sendRefreshToken = require("../helpers/sendRefreshTokens");
const cookie = require("cookie");

const refresh_token = async (req, res) => {
  const prueba = req.headers.cookie;
  if (!prueba) {
    return res
      .status(400)
      .send({ ok: false, accessToken: "", message: "no token" });
  }
  const { jid: token } = cookie.parse(req.headers.cookie);
  if (!token) {
    return res
      .status(400)
      .send({ ok: false, accessToken: "", message: "no token" });
  }
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .send({ ok: false, accessToken: "", message: "token invalid" });
  }
  // token is valid and we can send an access token
  let user = null;
  try {
    user = await User.findOne({ where: { id: payload.userId } });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ ok: false, accessToken: "", message: "Server Error" });
  }
  if (!user) {
    return res
      .status(500)
      .send({ ok: false, accessToken: "", message: "no user found" });
  }
  user = user.toJSON();
  if (user.tokenVersion !== payload.tokenVersion) {
    return res
      .status(400)
      .send({ ok: false, accessToken: "", message: "Refresh token invald" });
  }
  try {
    await sendRefreshToken(res, createRefreshToken(user));
  } catch (err) {
    console.error(err);
  }

  return res
    .status(200)
    .send({ ok: true, accessToken: createAccesToken(user) });
};

module.exports = refresh_token;
