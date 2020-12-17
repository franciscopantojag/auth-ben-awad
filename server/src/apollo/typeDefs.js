const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: Int
    firstName: String
    lastName: String
    email: String
    # password: String
  }
  type LoginResponse {
    accessToken: String
    user: User
  }
  type Query {
    hello: String
    getUsers: [User]
    bye: String
    me: User
  }
  type Mutation {
    logout: Boolean
    revokeRefreshTokensForUser(userId: Int!): Boolean
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): LoginResponse
  }
`;
