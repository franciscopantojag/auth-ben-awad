import { useQuery } from "@apollo/client";
import ME from "../apollo-client/queries/me";

export default function Me() {
  const { data, loading, error } = useQuery(ME);
  if (loading) return <li>Loading...</li>;
  if (error) return <li>Error :{"("}</li>;
  return data && data.me ? (
    <li>
      You are logged in as: {data.me.firstName} {data.me.lastName}, with email:{" "}
      {data.me.email}
    </li>
  ) : (
    <li>Not logged in</li>
  );
}
