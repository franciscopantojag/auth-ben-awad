const jwt_decode = require("jwt-decode");
const sendRefreshToken = async (res, token) => {
  let expires = 0;
  if (token) {
    const { exp } = jwt_decode(token);
    expires = new Date(exp * 1000);
  }
  res.cookie("jid", token, {
    httpOnly: true,
    expires,
    path: "/refresh_token",
  });
};

module.exports = sendRefreshToken;
