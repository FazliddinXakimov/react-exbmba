import React from "react";
import BaseModal from "../BaseComponents/BaseModal";
import { useDispatch, useSelector } from "react-redux";
import { setSuccessModal } from "../../store/slices/modalSlice";
import styled from "styled-components";
import CheckImage from "@/assets/images/check-mark.png";

const SuccessModal = () => {
  const dispatch = useDispatch();
  const successModal = useSelector((state) => state.modal.successModal);
  const successModalText = useSelector((state) => state.modal.successModalText);

  return (
    <BaseModal
      isOpen={successModal}
      onClose={() => dispatch(setSuccessModal({ modal: false }))}
      size={"sm"}
    >
      <SuccessModalWrapper>
        <img src={CheckImage} alt="check-image" />
        <div className="alert-text">{successModalText}</div>
      </SuccessModalWrapper>
    </BaseModal>
  );
};

export default SuccessModal;

const SuccessModalWrapper = styled.div`
  text-align: center;

  img {
    width: 60px;
    height: 60px;
  }

  .alert-text {
    font-size: var(--font-size-md);
    font-weight: 500;
    text-align: center;
    margin: 10px 0;
  }
`;
