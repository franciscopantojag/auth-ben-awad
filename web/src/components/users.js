import { useQuery } from "@apollo/client";
import GET_USERS from "../apollo-client/queries/getUsers";

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);
  if (loading) return <li>Loading...</li>;
  if (error) return <li>Error :{"("}</li>;
  return (
    <ul className="usersUl">
      {data && data.getUsers ? (
        data.getUsers.map((user) => (
          <li key={user.id}>
            Name:{" "}
            {`${user.firstName ?? user.firstName} ${
              user.lastName ?? user.lastName
            }`}{" "}
            <br />
            Email: {`${user.email ?? user.email}`}{" "}
          </li>
        ))
      ) : (
        <li>Error :{"("}</li>
      )}
    </ul>
  );
}
