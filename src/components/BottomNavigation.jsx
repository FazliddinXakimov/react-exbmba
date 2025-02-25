import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeImg from "../assets/images/home.png";
import TestIcon from "../assets/images/test-list.png";
import Leaders from "../assets/images/leaders.png";
import Profile from "../assets/images/profile.png";

const BottomNavigation = () => {
  const location = useLocation();

  const isActive = (currentPath) => {
    if (currentPath === "/") return location.pathname === "/";
    return location.pathname.startsWith(currentPath);
  };

  return (
    <BottomNav>
      <NavItem to="/" className={isActive("/") ? "active" : ""}>
        <img src={HomeImg} alt="Home" />
        <div>Home</div>
      </NavItem>
      <NavItem to="/tests" className={isActive("/tests") ? "active" : ""}>
        <img src={TestIcon} alt="Test" />
        <div>Test</div>
      </NavItem>
      <NavItem to="/leaders" className={isActive("/leaders") ? "active" : ""}>
        <img src={Leaders} alt="Leaders" />
        <div>Leaders</div>
      </NavItem>
      <NavItem
        to="/profile/user-information"
        className={isActive("/profile") ? "active" : ""}
      >
        <img src={Profile} alt="Profile" />
        <div>Profile</div>
      </NavItem>
    </BottomNav>
  );
};

export default BottomNavigation;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--background-color);
  height: var(--navbar-height);
  border-top: 1px solid var(--secondary-color);
  padding: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
`;

const NavItem = styled(Link)`
  display: flex;
  text-decoration: none;
  color: var(--dark-gray-color);
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  transition: background-color 0.3s ease, transform 0.3s ease;

  img {
    height: 24px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: var(--light-primary-color);
    /* transform: scale(1.05); */
  }

  &.active {
    background-color: var(--light-primary-color);

    /* img {
      transform: scale(1.1);
    } */
  }
`;
