import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import ExbmbaLogo from "../assets/logos/exbmba.png";
import UzLogo from "../assets/logos/uz.png";
import RuLogo from "../assets/logos/ru.png";
import QrLogo from "../assets/logos/qr.png";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  background: var(--background-color);
  border-bottom: 1px solid var(--secondary-color);
  padding: 0 20px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    height: 28px;
  }

  .language {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .language-flag {
      height: 32px;
      cursor: pointer;
    }

    .language-name {
      font-weight: 600;
    }

    .dropdown {
      position: absolute;
      top: 40px;
      right: 0;
      background: var(--background-color);
      border: 1px solid var(--secondary-color);
      border-radius: 5px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 5px 10px;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
          background: var(--hover-background-color);
        }

        img {
          height: 24px;
        }
      }
    }
  }
`;

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { name: "UZB", flag: UzLogo },
    { name: "RUS", flag: RuLogo },
    { name: "QAR", flag: QrLogo },
  ];

  // Close dropdown when clicking outside
  useLayoutEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <NavbarContainer>
      <img className="logo" src={ExbmbaLogo} />
      <div className="language" ref={dropdownRef}>
        <div className="language-name">UZB</div>
        <img
          className="language-flag"
          src={UzLogo}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <div className="dropdown">
            {languages.map((lang) => (
              <div key={lang.name} className="dropdown-item">
                <img src={lang.flag} alt={lang.name} />
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
