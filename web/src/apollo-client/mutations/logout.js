const { gql } = require("apollo-boost");

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
export default LOGOUT;
