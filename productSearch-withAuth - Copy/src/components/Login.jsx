import React from "react";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useState({});
  const signIn = useSignIn();

  //console.log(jwt);
  
  const submit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch("http://localhost:3000/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setJwt(data);
        signIn({
          token: data.token,
          expiresIn: 10000,
          tokenType: "Bearer",
          authState: { email: email },
        });
      });
    // setEmail("");
    // setPassword("");
  };
  const setEmailInput = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const setPasswordInput = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <input
            // type="email"
            type="text"
            className="form-control"
            placeholder="Enter email"
            onInput={setEmailInput}
            value={email}
          />
        </div>
        <div className="mb-3">
          <input
            // type="password"
            type="text"
            className="form-control"
            placeholder="Enter password"
            onInput={setPasswordInput}
            value={password}
          />
        </div>
        <input className="btn btn-primary mt-2" type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
