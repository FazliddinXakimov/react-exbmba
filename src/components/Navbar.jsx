import React from "react";
import styled from "styled-components";
import ExbmbaLogo from "../assets/logos/exbmba.png";

import { setLanguageModal } from "../store/slices/modalSlice";
import { LANGUAGES } from "../utils/constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = LANGUAGES.find((lang) => lang.code === i18n.language);
  console.log("uc", currentLanguage);

  return (
    <NavbarContainer>
      <img className="logo" src={ExbmbaLogo} />
      <div className="language">
        <div className="language-name">{currentLanguage.shortName}</div>
        <img
          className="language-flag"
          src={currentLanguage.flag}
          onClick={() => dispatch(setLanguageModal(true))}
        />
      </div>
    </NavbarContainer>
  );
};

export default Navbar;

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
  }
`;
