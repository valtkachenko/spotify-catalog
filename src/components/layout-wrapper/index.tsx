import React, { FC, ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Navbar } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { CurrentUser } from "../../pages/types";
import "./LayoutWrapper.scss";

interface LayoutWrapperProps {
  children: ReactElement;
}

export const LayoutWrapper: FC<LayoutWrapperProps> = ({ children }) => {
  const { pathname } = useLocation();

  if (pathname === "/login") {
    return children;
  }

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<CurrentUser>();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_SPOTIFY_API}/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCurrentUser({
          email: response.data.email,
          displayName: response.data.display_name,
        });
      });
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar className="navbar">
        <Navbar.Group className="group">
          <Button
            className="btn"
            text="Home"
            onClick={() => {
              navigate("/");
            }}
          />
          <Popover2
            isOpen={undefined}
            interactionKind="hover"
            placement="bottom"
            enforceFocus={false}
            usePortal={false}
            content={
              <div className="popover">
                <p className="info">{currentUser?.displayName}</p>
                <p className="info">{currentUser?.email}</p>
                {!process.env.REACT_APP_CLIENT_ID && (
                  <Button className="logout-btn" onClick={logout}>
                    Logout
                  </Button>
                )}
              </div>
            }
          >
            <Button className="btn" text="Account" />
          </Popover2>
        </Navbar.Group>
      </Navbar>
      {children}
    </>
  );
};
