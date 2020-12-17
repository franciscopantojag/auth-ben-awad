import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import CREATE_USER from "../apollo-client/mutations/createUser";

export default function Register({ history }) {
  const [createUser] = useMutation(CREATE_USER, {
    update: (cache, { data: { createUser } }) => {
      cache.modify({
        fields: {
          getUsers(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: createUser,
              fragment: gql`
                fragment NewUser on User {
                  firstName
                  lastName
                  email
                  id
                }
              `,
            });
            return [...existingUsers, newUserRef];
          },
        },
      });
    },
    // update: (cache) => {
    //   cache.evict({ fieldName: "getUsers" });
    // },
  });
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleForm = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    if (allowSubmit) {
      setAllowSubmit(() => false);
      const { firstName, lastName, email, password } = form;
      try {
        const response = await createUser({
          variables: {
            firstName,
            lastName,
            email,
            password,
          },
        });
        console.log(response);
        history.push("/");
        setAllowSubmit(() => true);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div className="registerPage">
      <div className="container">
        <h1>Hello from Register</h1>
        <form onSubmit={onSubmit}>
          <div className="formRow">
            <label htmlFor="firstName">First Name:</label>
            <br />
            <input
              name="firstName"
              onChange={handleForm}
              placeholder=""
              type="text"
              value={form.firstName}
            />
          </div>
          <div className="formRow">
            <label htmlFor="lastName">Last Name:</label>
            <br />
            <input
              name="lastName"
              onChange={handleForm}
              placeholder=""
              type="text"
              value={form.lastName}
            />
          </div>
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
