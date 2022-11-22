import React, { FC, useState } from "react";
import { Card, InputGroup } from "@blueprintjs/core";
import { ClientCredentials } from "../types";
import "./Login.scss";

interface LoginProps {
  onChangeCredentials: (newCredentials: ClientCredentials) => void;
}

export const Login: FC<LoginProps> = ({ onChangeCredentials }) => {
  const [clientId, setClientId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");

  const handleSubmit = () => {
    if (clientId && clientSecret) {
      onChangeCredentials({ clientId, clientSecret });
    }
  };

  return (
    <div className="login">
      <Card className="card">
        <div className="input-group">
          <p className="input-title">Client Id</p>
          <InputGroup
            className="input"
            value={clientId}
            onChange={(e) => {
              setClientId(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <p className="input-title">Client Secret</p>
          <InputGroup
            className="input"
            value={clientSecret}
            onChange={(e) => {
              setClientSecret(e.target.value);
            }}
          />
        </div>
        <button className="btn" onClick={handleSubmit}>
          Login
        </button>
      </Card>
    </div>
  );
};
