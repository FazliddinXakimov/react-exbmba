import React, { useState } from "react";
import styled from "styled-components";
import Eye from "../../assets/images/eye.png";
import EyeSlash from "../../assets/images/eye-slash.png";

const InputField = ({ label, name, register, error, type = "text" }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [value, setValue] = useState("");

  const formatPhoneNumber = (input) => {
    // Remove non-digits
    let numbers = input.replace(/\D/g, "");

    // Ensure max length of 12 (including country code)
    if (numbers.length > 12) numbers = numbers.slice(0, 12);

    // Format: +998 XX XXX XX XX
    let formatted = "+998 ";
    if (numbers.length > 3) formatted += numbers.slice(3, 5) + " ";
    if (numbers.length > 5) formatted += numbers.slice(5, 8) + " ";
    if (numbers.length > 8) formatted += numbers.slice(8, 10) + " ";
    if (numbers.length > 10) formatted += numbers.slice(10, 12);

    return formatted;
  };

  const handleChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setValue(formattedValue);
  };

  const getType = () => {
    if (type === "password") {
      return togglePassword ? "text" : "password";
    }
    return type;
  };

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  return (
    <InputFieldWrapper>
      <label>{label}</label>
      <input
        {...register(name)}
        type={getType()}
        value={type === "tel" ? value : undefined}
        onChange={type === "tel" ? handleChange : undefined}
        placeholder={type === "tel" ? "+998 XX XXX XX XX" : ""}
      />
      {type === "password" && (
        <img
          onClick={handleTogglePassword}
          src={togglePassword ? Eye : EyeSlash}
          className="password-toggler"
          alt="Toggle Password"
        />
      )}
      {error && <div className="error-message">{error.message}</div>}
    </InputFieldWrapper>
  );
};

export default InputField;

const InputFieldWrapper = styled.div`
  margin-bottom: 10px;
  position: relative;
  label {
    display: block;
    font-size: var(--font-size-md);
    margin-bottom: 4px;
  }

  input {
    display: block;
    border-radius: var(--radius-md);
    outline: none;
    padding: 0 10px;
    height: 36px;
    width: 100%;
    border: 1px solid var(--slate-color);
  }

  .error-message {
    color: var(--danger-color);
    margin-top: 4px;
  }

  .password-toggler {
    position: absolute;
    top: 39px;
    right: 10px;
    height: 18px;
    cursor: pointer;
  }
`;
