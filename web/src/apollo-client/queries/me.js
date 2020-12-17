const { gql } = require("apollo-boost");

const ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;
export default ME;
