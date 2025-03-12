import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import Eye from "../../assets/images/eye.png";
import EyeSlash from "../../assets/images/eye-slash.png";

// Forward ref to IMaskInput
const BaseInput = forwardRef(
  ({ label, name, control, error, type = "text" }, ref) => {
    const [togglePassword, setTogglePassword] = useState(false);

    const getMask = (type) => (type === "tel" ? "+998 00 000 00 00" : /.*/);
    const getPlaceholder = (type) =>
      type === "tel" ? "+998 XX XXX XX XX" : "";

    return (
      <InputWrapper>
        <label>{label}</label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <IMaskInput
              {...field}
              mask={getMask(type)}
              lazy={false}
              placeholder={getPlaceholder(type)}
              type={
                type === "password"
                  ? togglePassword
                    ? "text"
                    : "password"
                  : type
              }
              value={field.value} // Ensure value is controlled
              onAccept={(value) => field.onChange(value)} // Ensure changes are saved
              ref={(el) => {
                field.ref(el?.element); // Ensure ref points to the real input field inside IMaskInput
                if (ref) {
                  if (typeof ref === "function") {
                    ref(el?.element);
                  } else {
                    ref.current = el?.element;
                  }
                }
              }}
            />
          )}
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
      </InputWrapper>
    );
  }
);

// Allow ref forwarding
BaseInput.displayName = "BaseInput";

export default BaseInput;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-size: 14px;
    margin-bottom: 4px;
  }

  input {
    border: 1px solid var(--slate-color);
    padding: 10px;
    border-radius: 5px;
    outline: none;
    width: 100%;
  }

  input:focus {
    border-color: var(--primary-color);
  }

  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }

  .password-toggler {
    position: absolute;
    top: 36px;
    right: 10px;
    height: 18px;
    cursor: pointer;
  }
`;
