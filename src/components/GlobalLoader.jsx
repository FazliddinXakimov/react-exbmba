import React from "react";
import styled, { keyframes } from "styled-components";
import LoadingSVG from "../assets/logos/pure-logo.svg"; // Adjust path based on your project structure

// Rotation animation
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled wrapper
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

// Animated SVG
const Spinner = styled.img`
  width: 40px;
  height: 40px;
  animation: ${rotate} 2s linear infinite;
`;

const LoadingOverlay = () => {
  return (
    <LoadingContainer>
      <Spinner src={LoadingSVG} alt="Loading..." />
    </LoadingContainer>
  );
};

export default LoadingOverlay;
