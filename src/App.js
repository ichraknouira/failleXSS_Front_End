import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubscriberFeed from "./components/SubscriberFeed";
import Login from "./components/Login";
import XSSHelper from "./components/XSSHelper";
import { useEffect, useState } from "react";

const App = () => {
  // add state to check user authenticated or not and loader
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // call authStatus API to check status
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
  // upate state authenticated
  const isAuthenticated = async () => {
    const authStatus = await getAuthStatus();
    setAuthenticated(authStatus.isAuthenticated);
    await setLoading(false);
  };

  // clear Cookie
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
  // use hook to call isAuthenticated func
  useEffect(() => {
    isAuthenticated();
  }, []);

  // render component
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
