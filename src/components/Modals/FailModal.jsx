import React from "react";
import BaseModal from "../BaseComponents/BaseModal";
import { useDispatch, useSelector } from "react-redux";
import { setFailModal } from "../../store/slices/modalSlice";
import styled from "styled-components";
import FailImage from "@/assets/images/x-mark.png";

const FailModal = () => {
  const dispatch = useDispatch();
  const failModal = useSelector((state) => state.modal.failModal);
  const failModalText = useSelector((state) => state.modal.failModalText);

  return (
    <BaseModal
      isOpen={failModal}
      onClose={() => dispatch(setFailModal({ modal: false }))}
      size={"sm"}
    >
      <FailModalWrapper>
        <img src={FailImage} alt="fail-image" />
        <div className="alert-text">{failModalText}</div>
      </FailModalWrapper>
    </BaseModal>
  );
};

export default FailModal;

const FailModalWrapper = styled.div`
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
