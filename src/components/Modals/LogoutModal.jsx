import React from "react";
import BaseModal from "../BaseComponents/BaseModal";
import BaseButton from "../BaseComponents/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal } from "../../store/slices/modalSlice";
import styled from "styled-components";
import { logout } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const logoutModal = useSelector((state) => state.modal.logoutModal);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(true));
    dispatch(setLogoutModal(false));
    navigate("/", { replace: true });
  };

  return (
    <BaseModal
      isOpen={logoutModal}
      onClose={() => dispatch(setLogoutModal(false))}
      size={"sm"}
    >
      <LogoutModalWrapper>
        <div className="alert-text">Platformani tark etmoqchimisiz ?</div>
        <BaseButton onClick={handleLogout} color="primary" fullwidth>
          Ha
        </BaseButton>
      </LogoutModalWrapper>
    </BaseModal>
  );
};

export default LogoutModal;

const LogoutModalWrapper = styled.div`
  .alert-text {
    font-size: var(--font-size-md);
    font-weight: 500;
    text-align: center;
    margin-bottom: 20px;
  }
`;
