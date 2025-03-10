import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const BaseButton = ({
  children,
  className,
  type = "button",
  color = "primary",
  isLoading = false,
  isOutline = false,
  fullwidth = false,

  onClick,
}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (event) => {
    if (isLoading) return;

    addRipple(event);

    if (onClick) {
      onClick(event);
    }
  };

  const addRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const x = event.clientX - rect.left - radius;
    const y = event.clientY - rect.top - radius;

    const newRipple = { id: Date.now(), x, y, size: diameter };
    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== newRipple.id)
      );
    }, 600);
  };

  const getColor = () => {
    switch (color) {
      case "secondary":
        return "var(--secondary-color)";
      case "danger":
        return "var(--danger-color)";
      default:
        return "var(--primary-color)";
    }
  };

  return (
    <ButtonWrapper
      className={className}
      type={type}
      onClick={handleClick}
      disabled={isLoading}
      color={getColor()}
      $isOutline={isOutline}
      $fullwidth={fullwidth}
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
  cursor: pointer;
  text-align: center;
  color: ${({ $isOutline, color }) => ($isOutline ? color : "white")};
  height: 36px;
  width: ${({ $fullwidth }) => ($fullwidth ? "100%" : "auto")};
  padding: 0 12px;
  background-color: ${({ $isOutline, color }) =>
    $isOutline ? "transparent" : color};
  border: ${({ $isOutline, color }) =>
    $isOutline ? `2px solid ${color}` : "none"};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, opacity 0.3s;
  font-size: 14px;
  font-weight: 500;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
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
