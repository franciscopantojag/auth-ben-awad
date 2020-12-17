import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import LOGIN from "../apollo-client/mutations/login";
import { setAccessToken } from "../lib/accesToken";

export default function Login({ history }) {
  const [login] = useMutation(LOGIN, {
    update(
      cache,
      {
        data: {
          login: { user },
        },
      }
    ) {
      cache.modify({
        fields: {
          bye() {
            return `Your user id is: ${user.id}`;
          },
          me() {
            const newUserRef = cache.writeFragment({
              data: user,
              fragment: gql`
                fragment NewUser on User {
                  firstName
                  lastName
                  email
                  id
                }
              `,
            });
            return newUserRef;
          },
        },
      });
    },
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleForm = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: { ...form },
      });
      if (response && response.data) {
        const accessToken = response.data.login.accessToken;
        setAccessToken(accessToken);
      }
      history.push("/");
    } catch (err) {
      const { message } = err;
      console.log(message);
    }
  };
  return (
    <div className="loginPage">
      <div className="container">
        <h1>Hello from Login</h1>
        <form onSubmit={onSubmit}>
          <div className="formRow">
            <label htmlFor="email">Email:</label>
            <br />
            <input
              name="email"
              onChange={handleForm}
              placeholder=""
              type="text"
              value={form.email}
            />
          </div>
          <div className="formRow">
            <label htmlFor="password">Password:</label>
            <br />
            <input
              autoComplete="false"
              name="password"
              onChange={handleForm}
              placeholder=""
              type="password"
              value={form.password}
            />
          </div>
          <div className="formRow">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
