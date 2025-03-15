import React from "react";
import BaseModal from "../BaseComponents/BaseModal";
import { useDispatch, useSelector } from "react-redux";
import { setLanguageModal } from "../../store/slices/modalSlice";
import styled from "styled-components";
import { LANGUAGES } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import CheckMark from "@/assets/images/check-mark.png";
import { updateUser } from "../../store/actions/userActions";

const LanguageModal = () => {
  const dispatch = useDispatch();
  const languageModal = useSelector((state) => state.modal.languageModal);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const { i18n } = useTranslation();

  async function changeLanguage(code) {
    i18n.changeLanguage(code);
    dispatch(setLanguageModal(false));
    if (isLoggedIn) {
      await dispatch(updateUser({ language: code }));
    }

    window.location.reload();
  }

  console.log("language", i18n.language);
  return (
    <BaseModal
      isOpen={languageModal}
      onClose={() => dispatch(setLanguageModal(false))}
      size={"sm"}
    >
      <LanguageModalWrapper>
        {LANGUAGES.map((item) => (
          <div
            key={item.code}
            className="language"
            onClick={() => changeLanguage(item.code)}
          >
            <div className="lang-info">
              <img className="lang-image" src={item.flag} />
              <div className="lang-name">{item.name}</div>
            </div>
            {i18n.language == item.code && (
              <img className="active-lang" src={CheckMark} />
            )}
          </div>
        ))}
      </LanguageModalWrapper>
    </BaseModal>
  );
};

export default LanguageModal;

const LanguageModalWrapper = styled.div`
  .language {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;
    &:hover {
      background: var(--primary-color);
      margin-left: -20px;
      margin-right: -20px;
      padding-left: 20px;
      padding-right: 20px;
      color: white;
    }
  }
  .lang-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .active-lang {
    width: 30px;
    height: 30px;
    margin-left: 20px;
  }
  /* 
  .language.active {
    background-color: var(--primary-color);
    margin-left: -20px !important;
    margin-right: -20px !important;
    padding-right: 20px;
    padding-left: 20px;
  } */
  .lang-image {
    width: 30px;
    height: 30px;
  }

  .lang-name {
    font-size: var(--font-size-md);
    font-weight: 500;
  }
`;
