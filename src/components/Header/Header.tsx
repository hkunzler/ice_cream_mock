import { Button, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import { NeonStyle } from "./Header.styles";

const Header: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const location = useLocation();
  
  const getDefaultSelectedKeys = () => {
    const path = location.pathname;
    console.log(path);
    
    if (path === '/about') {
      return ['about'];
    } 
    return ['/'];
  };
  return (
    <Menu
      defaultSelectedKeys={getDefaultSelectedKeys()}
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="logo" style={{ marginRight: "auto", fontSize: "1.5rem" }}>
        <NeonStyle>Ice Cream</NeonStyle>
      </Menu.Item>
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about">About</Link>
      </Menu.Item>
      {user ? (
        <Menu.Item key="signout">
          <Button type="primary" onClick={handleSignOut}>
            Sign Out{" "}
          </Button>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

export default Header;
