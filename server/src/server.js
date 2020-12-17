const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./apollo/typeDefs");
const resolvers = require("./apollo/resolvers");
const refresh_token = require("./routeHandlers/refresh_token");
const { sequelize } = require("./models");
const cors = require("cors");
require("dotenv").config();

const regex = /^(http:\/\/localhost:3000)|(http:\/\/localhost:4000)$/;
const regex1 = /^http:\/\/localhost:/;

const app = express();
app.use(
  cors({
    origin: regex1,
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.status(200).json({ hello: "world" });
});
app.post("/refresh_token", refresh_token);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
apolloServer.applyMiddleware({ app, cors: false });

app.listen({ port: 4000 }, async () => {
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (err) {
    console.error(err);
  }
});
