import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubscriberFeed from "./components/SubscriberFeed";
import Login from "./components/Login";
import XSSHelper from "./components/XSSHelper";
import { useEffect, useState } from "react";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAuthStatus = async () => {
    await setLoading(true);
    return fetch("http://localhost:8080/auth-status", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  };
  const isAuthenticated = async () => {
    const authStatus = await getAuthStatus();
    setAuthenticated(authStatus.isAuthenticated);
    await setLoading(false);
  };
  async function logoutUser() {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    isAuthenticated();
  }
  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
      {!loading && (
        <>
          {!authenticated && <Login />}
          {authenticated && (
            <div className="App">
              <h1 className="App-header">JWT-Storage-Tutorial Application</h1>
              <button onClick={logoutUser}>Logout</button>

              <BrowserRouter>
                <Routes>
                  <Route
                    path="/subscriber-feed"
                    element={<SubscriberFeed />}
                  ></Route>
                  <Route path="/xss-helper" element={<XSSHelper />}></Route>
                </Routes>
              </BrowserRouter>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default App;
