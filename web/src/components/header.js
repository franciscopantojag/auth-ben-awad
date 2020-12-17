import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import LOGOUT from "../apollo-client/mutations/logout";
import ME from "../apollo-client/queries/me";
import { setAccessToken } from "../lib/accesToken";

export default function Header() {
  const { data, loading, error } = useQuery(ME);
  const [logout, { client }] = useMutation(LOGOUT);
  const handleLogout = async () => {
    await logout();
    setAccessToken(null);
    await client.resetStore();
  };
  let body = <li>Loading...</li>;
  let buttonBody = body;
  if (loading) {
    body = <li>Loading...</li>;
  } else if (error) {
    body = <li>Error :{"("}</li>;
    buttonBody = body;
  } else if (!loading && data && data.me) {
    body = (
      <li>
        You are logged in as: {data.me.firstName} {data.me.lastName}, with
        email: {data.me.email}
      </li>
    );
    buttonBody = (
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    );
  } else {
    body = <li>Not logged in</li>;
    buttonBody = null;
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!(data && data.me) ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : null}

          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/bye">Bye</Link>
          </li>
          {body}
          {buttonBody}
        </ul>
      </nav>
    </header>
  );
}
