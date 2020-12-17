const applyResolverMid = require("apollo-resolver-middleware");
const isAuth = require("../../helpers/isAuth");
const revokeRefreshTokensForUser = require("./revokeRefreshTokensForUser");
const login = require("./login");
const createUser = require("./createUser");
const getUsers = require("./getUsers");
const me = require("./me");
const sendRefreshToken = require("../../helpers/sendRefreshTokens");

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    getUsers,
    bye: async (_, args, { payload }) => {
      const { userId } = payload;
      return `Your user id is: ${userId}`;
    },
    me,
  },
  Mutation: {
    revokeRefreshTokensForUser,
    login,
    createUser,
    logout: async (_, _args, ctx) => {
      const { res } = ctx;
      try {
        await sendRefreshToken(res, "");
      } catch (err) {
        console.error(err);
        return false;
      }
      return true;
    },
  },
};
applyResolverMid(resolvers, "Query.bye", (args, ctx, next) =>
  isAuth(args, ctx, next)
);
module.exports = resolvers;
