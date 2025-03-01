import React, { useState } from "react";
import styled from "styled-components";
import Eye from "../../assets/images/eye.png";
import EyeSlash from "../../assets/images/eye-slash.png";

const InputField = ({
  label,
  name,
  register,
  error,
  type = "text",
  setValue,
  watch,
  trigger,
  isSubmitted,
}) => {
  const [togglePassword, setTogglePassword] = useState(false);

  const formatPhoneNumber = (input) => {
    let numbers = input.replace(/\D/g, "").slice(0, 12);
   
    let formatted = "+998 ";
    if (numbers.length > 3) formatted += numbers.slice(3, 5) + " ";
    if (numbers.length > 5) formatted += numbers.slice(5, 8) + " ";
    if (numbers.length > 8) formatted += numbers.slice(8, 10) + " ";
    if (numbers.length > 10) formatted += numbers.slice(10, 12);
    return formatted;
  };

  const handleChange = (e) => {
    if (type === "tel") {
      const formattedValue = formatPhoneNumber(e.target.value);
      setValue(name, formattedValue);
    } else {
      setValue(name, e.target.value);
    }

    if (isSubmitted) {
      trigger(name);
    }
  };

  return (
    <InputFieldWrapper>
      <label>{label}</label>
      <input
        {...register(name)}
        type={
          type === "password" ? (togglePassword ? "text" : "password") : type
        }
        value={watch(name) || ""}
        onChange={handleChange}
        placeholder={type === "tel" ? "+998 XX XXX XX XX" : ""}
      />
      {type === "password" && (
        <img
          onClick={() => setTogglePassword(!togglePassword)}
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

  input:focus {
    border: 1px solid var(--primary-color);
  }

  .error-message {
    color: var(--danger-color);
    margin-top: 4px;
    font-size: var(--font-size-sm);
  }

  .password-toggler {
    position: absolute;
    top: 39px;
    right: 10px;
    height: 18px;
    cursor: pointer;
  }
`;
