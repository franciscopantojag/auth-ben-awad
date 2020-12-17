import { useEffect, useState } from "react";
import { setAccessToken } from "./lib/accesToken";
import Routes from "./Routes";

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
        const { accessToken } = await response.json();
        setAccessToken(accessToken);
        setLoading(() => false);
      } catch (err) {
        setLoading(() => false);
        console.error(err);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <Routes />;
}
