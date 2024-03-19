import React, { useRef } from "react";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username: emailRef.current.value,
      password: passwordRef.current.value,
    });
    window.location.reload(false);
  };
  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" ref={emailRef} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" ref={passwordRef} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
