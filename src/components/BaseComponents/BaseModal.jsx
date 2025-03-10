import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes, css } from "styled-components";
import CloseIcon from "../../assets/images/close-icon.png";

// Keyframes for fade-in and fade-out animations
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ $isClosing }) => ($isClosing ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

const getWidth = (size) => {
  switch (size) {
    case "sm":
      return "300px";
    case "md":
      return "500px";
    case "lg":
      return "800px";
    case "xl":
      return "100vw";
    default:
      return "500px";
  }
};

const ModalContainer = styled.div`
  background: white;
  padding: 40px 20px 20px 20px;

  width: ${({ size }) => getWidth(size)};
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s
    ease-in-out;

  ${({ size }) =>
    size === "xl" &&
    css`
      height: 100vh;
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;
    `}

  .close-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const BaseModal = ({ isOpen, onClose, children, size = "md" }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for animation to complete before unmounting
  };

  if (!isOpen && !isClosing) return null;

  return ReactDOM.createPortal(
    <Overlay $isClosing={isClosing} onClick={handleClose}>
      <ModalContainer
        $isClosing={isClosing}
        size={size}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="close-icon"
          onClick={handleClose}
          src={CloseIcon}
          alt="Close"
        />
        {children}
      </ModalContainer>
    </Overlay>,
    document.getElementById("modal-root")
  );
};

export default BaseModal;
