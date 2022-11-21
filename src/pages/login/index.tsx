import React from "react";
import { Card, InputGroup } from "@blueprintjs/core";
import "./Login.scss";

export const Login = () => {
  return (
    <div className="login">
      <Card className="card">
        <h1 className="title">Log In</h1>
        <div className="input-group">
          <p className="input-title">Client Id</p>
          <InputGroup className="input" />
        </div>
        <div className="input-group">
          <p className="input-title">Client Secret</p>
          <InputGroup className="input" />
        </div>
      </Card>
    </div>
  );
};
