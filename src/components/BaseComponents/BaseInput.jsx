import React, { useState } from "react";
import styled from "styled-components";
import { IMaskInput } from "react-imask";
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

  const handleMaskedChange = (value) => {
    setValue(name, value);
    if (isSubmitted) {
      trigger(name);
    }
  };

  const getMask = (type) => {
    return type === "tel" ? "+998 00 000 00 00" : /.*/;
  };

  const getPlaceholder = (type) => {
    return type === "tel" ? "+998 XX XXX XX XX" : "";
  };

  return (
    <InputFieldWrapper>
      <label>{label}</label>
      <IMaskInput
        mask={getMask(type)}
        lazy={false}
        value={watch(name) || ""}
        onAccept={handleMaskedChange}
        inputRef={(el) => register(name).ref(el)}
        placeholder={getPlaceholder(type)}
        type={
          type === "password" ? (togglePassword ? "text" : "password") : type
        }
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
