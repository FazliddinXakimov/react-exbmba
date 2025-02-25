import React, { useState } from "react";
import styled from "styled-components";
import Eye from "../../assets/images/eye.png";
import EyeSlash from "../../assets/images/eye-slash.png";

const InputField = ({ label, name, register, error, type = "text" }) => {
  const [togglePassword, setTogglePassword] = useState(false);

  const getType = () => {
    if (type == "password") {
      if (togglePassword) return "password";
      return "text";
    }

    return type;
  };

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  return (
    <InputFieldWrapper>
      <label>{label}</label>
      <input {...register(name)} type={getType()} />
      {type == "password" && (
        <img
          onClick={handleTogglePassword}
          src={togglePassword ? Eye : EyeSlash}
          className="password-toggler"
        />
      )}

      {error && <div className="error-message">{error.messsage}</div>}
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

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
  }
`;
