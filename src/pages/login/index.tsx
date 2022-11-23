import React, { FC, useState } from "react";
import { Card, InputGroup } from "@blueprintjs/core";
import "./Login.scss";

interface LoginProps {
  onChangeClientId: (newClientId: string) => void;
}

export const Login: FC<LoginProps> = ({ onChangeClientId }) => {
  const [clientId, setClientId] = useState<string>("");

  const handleSubmit = () => {
    if (clientId) {
      onChangeClientId(clientId);
    }
  };

  return (
    <div className="login">
      <h1 className="title">Spotify Catalog</h1>
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
        <button className="btn" onClick={handleSubmit}>
          Login
        </button>
      </Card>
    </div>
  );
};
