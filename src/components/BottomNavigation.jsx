import React from "react";
import styled from "styled-components";
import HomeImg from "../assets/images/home.png";
import TestIcon from "../assets/images/test-list.png";
import Leaders from "../assets/images/leaders.png";
import Profile from "../assets/images/profile.png";

const BottomNavigation = () => {
  return (
    <BottomNav>
      <div className="nav-item">
        <div>
          <img src={HomeImg} />
          <div>Home</div>
        </div>
      </div>
      <div className="nav-item">
        <div>
          <img src={TestIcon} />
          <div>Test</div>
        </div>
      </div>
      <div className="nav-item">
        <div>
          <img src={Leaders} />
          <div>Leaders</div>
        </div>
      </div>
      <div className="nav-item active">
        <div>
          <img src={Profile} />
          <div>Profile</div>
        </div>
      </div>
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
  z-index: 1000; /* Ensure it stays above other elements */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;

  .nav-item {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-sm);

    img {
      height: 24px;
    }
  }

  .nav-item:hover {
    background-color: var(--light-primary-color);
  }

  .active {
    background-color: var(--light-primary-color);
  }
`;
