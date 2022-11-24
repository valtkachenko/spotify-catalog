import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { LayoutWrapper } from "./components/layout-wrapper";
import "./App.scss";

function App() {
  const navigate = useNavigate();

  const [clientId, setClientId] = useState<string>(
    process.env.REACT_APP_CLIENT_ID || ""
  );

  const token = window.location.hash.substr(1).split("&")[0].split("=")[1];

  if (token) {
    window.localStorage.setItem("token", token);
  }

  useEffect(() => {
    if (!token) {
      if (!clientId) {
        navigate("/login");
      } else {
        const authUrl =
          "https://accounts.spotify.com/authorize" +
          "?response_type=token" +
          "&client_id=" +
          encodeURIComponent(clientId) +
          "&scope=" +
          encodeURIComponent(
            "playlist-read-private playlist-modify-private user-top-read user-library-modify user-library-read user-read-private user-read-email"
          ) +
          "&redirect_uri=" +
          encodeURIComponent("http://localhost:3000/callback");

        window.location.href = authUrl;
      }
    }
  }, [clientId]);

  const handleChangeClientId = (newClientId: string) => {
    setClientId(newClientId);
  };

  return (
    <LayoutWrapper>
      <Routes>
        <Route path="callback/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onChangeClientId={handleChangeClientId} />}
        />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
