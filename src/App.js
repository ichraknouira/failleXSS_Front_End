import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubscriberFeed from "./components/SubscriberFeed";
import Login from "./components/Login";
import XSSHelper from "./components/XSSHelper";
function setToken(userToken) {
  localStorage.setItem("token", JSON.stringify(userToken));
  window.location.reload(false);
}

function getToken() {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}
function App() {
  let token = getToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <h1 className="App-header">JWT-Storage-Tutorial Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/subscriber-feed" element={<SubscriberFeed />}></Route>
          <Route path="/xss-helper" element={<XSSHelper />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
