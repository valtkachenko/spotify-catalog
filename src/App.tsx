import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import qs from "qs";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { ClientCredentials } from "./pages/types";
import "./App.scss";

function App() {
  const navigate = useNavigate();

  const [clientCredentials, setClientCredentials] = useState<ClientCredentials>(
    {
      clientId: process.env.REACT_APP_CLIENT_ID || "",
      clientSecret: process.env.REACT_APP_CLIENT_SECRET || "",
    }
  );

  const authOptions = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":
        "Basic " +
        Buffer.from(
          `${clientCredentials.clientId}:${clientCredentials.clientSecret}`
        ).toString("base64"),
    },
  };

  useEffect(() => {
    if (!clientCredentials.clientId || !clientCredentials.clientSecret) {
      if (!window.localStorage.getItem("token")) {
        navigate("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (clientCredentials.clientId && clientCredentials.clientSecret) {
      axios
        .post(
          "https://accounts.spotify.com/api/token",
          qs.stringify({
            grant_type: "client_credentials",
          }),
          authOptions
        )
        .then((response) => {
          window.localStorage.setItem("token", response.data.access_token);
          navigate("/");
        });
    }
  }, [clientCredentials.clientId, clientCredentials.clientSecret]);

  const handleChangeCredentials = (newCredentials: ClientCredentials) => {
    setClientCredentials({ ...newCredentials });
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<Login onChangeCredentials={handleChangeCredentials} />}
      />
    </Routes>
  );
}

export default App;
