import { useQuery } from "@apollo/client";
import BYE from "../apollo-client/queries/bye";

export default function Bye() {
  const { data, loading, error } = useQuery(BYE);
  let body = <li>Loading...</li>;
  if (loading) {
    body = <li>Loading...</li>;
  } else if (error) {
    console.log(error);
    body = <li>Error :{"("}</li>;
  } else if (data && data.bye) {
    body = <li>{data.bye}</li>;
  } else if (!data) {
    body = <li>No data :{"("}</li>;
  } else {
    body = <li>Not logged in</li>;
  }

  return (
    <div className="byePage">
      <div className="container">
        <h1>Hello from Bye</h1>
        <ul>{body}</ul>
      </div>
    </div>
  );
}
