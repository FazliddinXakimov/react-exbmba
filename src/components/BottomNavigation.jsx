import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeImg from "../assets/images/home.png";
import TestIcon from "../assets/images/test-list.png";
import TestIconActive from "../assets/images/test-list-active.png";
import Leaders from "../assets/images/leaders.png";
import LeadersActive from "../assets/images/leaders-active.png";

import Profile from "../assets/images/profile.png";
import ProfileActive from "../assets/images/profile-active.png";

import HomeImgActive from "../assets/images/home-active.png";
import { useSelector } from "react-redux";

const BottomNavigation = () => {
  const location = useLocation();

  const isLoggedId = useSelector((state) => state.user.isLoggedIn);

  const isActive = (currentPath) => {
    if (currentPath === "/") return location.pathname === "/";
    return location.pathname.startsWith(currentPath);
  };

  return (
    <BottomNav>
      <NavItem to="/" className={isActive("/") ? "active" : ""}>
        <img src={isActive("/") ? HomeImgActive : HomeImg} alt="Home" />
        <div>Home</div>
      </NavItem>
      <NavItem to="/tests" className={isActive("/tests") ? "active" : ""}>
        <img src={isActive("/tests") ? TestIconActive : TestIcon} alt="Test" />
        <div>Test</div>
      </NavItem>
      <NavItem to="/leaders" className={isActive("/leaders") ? "active" : ""}>
        <img
          src={isActive("/leaders") ? LeadersActive : Leaders}
          alt="Leaders"
        />
        <div>Leaders</div>
      </NavItem>
      <NavItem
        className={isActive("/profile") ? "active" : ""}
        to={isLoggedId ? "/profile/user-information" : "/auth/login"}
      >
        <img
          src={isActive("/profile") ? ProfileActive : Profile}
          alt="Profile"
        />
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
  font-weight: 600;
  cursor: pointer;
  img {
    height: 18px;
    transition: transform 0.3s ease;
  }

  &.active {
    color: var(--primary-color);
  }
`;
