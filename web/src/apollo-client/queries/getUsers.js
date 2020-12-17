import { gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      firstName
      lastName
      email
      id
    }
  }
`;

export default GET_USERS;
