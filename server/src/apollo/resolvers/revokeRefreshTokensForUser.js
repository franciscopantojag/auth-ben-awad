const { User, sequelize } = require("../../models");

const revokeRefreshTokensForUser = async (_, args) => {
  const { userId } = args;
  try {
    const response = await User.update(
      { tokenVersion: sequelize.literal("tokenVersion + 1") },
      { where: { id: userId } }
    );
    const [changes] = response;
    return changes === 0 ? false : true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = revokeRefreshTokensForUser;
