import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const BaseButton = ({ children, type = "button", className, isLoading }) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (event) => {
    if (isLoading) return;

    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const x = event.clientX - button.offsetLeft - radius;
    const y = event.clientY - button.offsetTop - radius;

    const newRipple = { id: Date.now(), x, y, size: diameter };
    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== newRipple.id)
      );
    }, 600);
  };

  return (
    <ButtonWrapper
      className={className}
      type={type}
      onClick={addRipple}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : children}
      {ripples.map((ripple) => (
        <Ripple key={ripple.id} x={ripple.x} y={ripple.y} size={ripple.size} />
      ))}
    </ButtonWrapper>
  );
};

const rippleEffect = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ButtonWrapper = styled.button`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  text-align: center;
  color: white;
  height: 36px;
  background-color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transform: scale(0);
  animation: ${rippleEffect} 0.6s linear;
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export default BaseButton;
